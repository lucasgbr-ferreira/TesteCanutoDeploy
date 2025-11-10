import bcrypt from "bcrypt";
import { ValidationError } from "sequelize";
import { Client, User } from "../models/index.js";
import sequelize from "../config/database.js";

/**
 * GET profile
 * - se req.params.id estiver presente, usa esse id (admin view)
 * - caso contrário tenta usar req.user.id (usuário autenticado)
 */
export const getClientProfile = async (req, res) => {
  try {
    const idFromParams = req.params.id;
    const userFromToken = req.user && req.user.id;
    const id = idFromParams ?? userFromToken;

    if (!id) {
      return res.status(401).json({ message: "Não autorizado: usuário não autenticado" });
    }

    const client = await Client.findOne({
      where: { user_id: id },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "email", "role", "createdAt"]
        }
      ]
    });

    if (!client) return res.status(404).json({ message: "Cliente não encontrado" });

    return res.json(client);
  } catch (err) {
    console.error("getClientProfile error:", err);
    return res.status(500).json({ message: "Erro ao carregar perfil" });
  }
};

/**
 * UPDATE profile
 * - utiliza transaction para atualizar User e Client com segurança
 * - valida possíveis conflitos (ex: email já usado)
 * - trata erros de validação do Sequelize e retorna mensagens úteis
 */
export const updateClient = async (req, res) => {
  // id pode vir por params (admin) ou pelo token (usuário)
  const idFromParams = req.params.id;
  const userFromToken = req.user && req.user.id;
  const id = idFromParams ?? userFromToken;

  if (!id) {
    return res.status(401).json({ message: "Não autorizado: usuário não autenticado" });
  }

  const {
    name,
    email,
    telefone,
    endereco,
    cpf,
    newPassword // campo usado no front
  } = req.body ?? {};

  // se não vier nenhum campo para atualizar, responde 400
  if (
    [name, email, telefone, endereco, cpf, newPassword].every(
      (v) => v === undefined || v === null || (typeof v === "string" && v.trim() === "")
    )
  ) {
    return res.status(400).json({ message: "Nenhum dado para atualizar" });
  }

  const t = await sequelize.transaction();
  try {
    const client = await Client.findOne({ where: { user_id: id }, transaction: t });
    const user = await User.findByPk(id, { transaction: t });

    if (!client || !user) {
      await t.rollback();
      return res.status(404).json({ message: "Cliente não encontrado" });
    }

    // se email foi passado e é diferente do atual, verificar conflito
    if (email && email.trim() !== "" && email !== user.email) {
      const existing = await User.findOne({ where: { email }, transaction: t });
      if (existing && existing.id !== user.id) {
        await t.rollback();
        return res.status(409).json({ message: "E-mail já cadastrado por outro usuário" });
      }
    }

    // Atualizações condicionais no model User
    const userUpdates = {};
    if (name && name.trim() !== "") userUpdates.name = name.trim();
    if (email && email.trim() !== "") userUpdates.email = email.trim();
    if (newPassword && newPassword.trim() !== "") {
      const hash = await bcrypt.hash(newPassword.trim(), 10);
      userUpdates.password = hash;
    }

    if (Object.keys(userUpdates).length) {
      await user.update(userUpdates, { transaction: t });
    }

    // Atualizações condicionais no model Client
    const clientUpdates = {};
    if (telefone !== undefined) clientUpdates.telefone = telefone ?? client.telefone;
    if (endereco !== undefined) clientUpdates.endereco = endereco ?? client.endereco;
    if (cpf !== undefined) clientUpdates.cpf = cpf ?? client.cpf;

    // Só chama update se houver algo para atualizar
    if (Object.keys(clientUpdates).length) {
      await client.update(clientUpdates, { transaction: t });
    }

    await t.commit();

    // Recarrega para retornar o estado atualizado
    const updatedClient = await Client.findOne({
      where: { user_id: id },
      include: [{ model: User, as: "user", attributes: ["id", "name", "email", "role", "createdAt"] }]
    });

    return res.json({
      message: "Perfil atualizado com sucesso",
      user: {
        id: updatedClient.user.id,
        name: updatedClient.user.name,
        email: updatedClient.user.email,
        role: updatedClient.user.role
      },
      client: {
        id: updatedClient.id,
        telefone: updatedClient.telefone,
        cpf: updatedClient.cpf,
        endereco: updatedClient.endereco
      }
    });
  } catch (err) {
    await t.rollback();

    // tratamento específico para erros de validação Sequelize
    if (err instanceof ValidationError) {
      const messages = err.errors.map((e) => e.message).join("; ");
      console.error("Sequelize validation error (updateClient):", messages);
      return res.status(400).json({ message: messages });
    }

    console.error("updateClient unexpected error:", err);
    return res.status(500).json({ message: "Erro ao atualizar perfil" });
  }
};
