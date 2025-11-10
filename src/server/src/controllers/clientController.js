import bcrypt from "bcrypt";
import { Client, User } from "../models/index.js";

/* get profile*/
export const getClientProfile = async (req, res) => {
  try {
    const id = req.params.id || req.user.id;

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
    console.error(err);
    return res.status(500).json({ message: "Erro ao carregar perfil" });
  }
};

/* update profile */
export const updateClient = async (req, res) => {
  try {
    const id = req.params.id || req.user.id;

    const client = await Client.findOne({ where: { user_id: id } });
    const user = await User.findByPk(id);

    if (!client || !user) {
      return res.status(404).json({ message: "Cliente não encontrado" });
    }

    const { name, email, telefone, endereco, cpf, newPassword } = req.body;

    /* atualiza user*/
    if (name) user.name = name;
    if (email) user.email = email;

    if (newPassword && newPassword.trim() !== "") {
      const hash = await bcrypt.hash(newPassword, 10);
      user.password = hash;
    }

    await user.save();

    /* atualiza client */
    await client.update({
      telefone: telefone ?? client.telefone,
      endereco: endereco ?? client.endereco,
      cpf: cpf ?? client.cpf
    });

    return res.json({
      message: "Perfil atualizado com sucesso",
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      client
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro ao atualizar perfil" });
  }
};
