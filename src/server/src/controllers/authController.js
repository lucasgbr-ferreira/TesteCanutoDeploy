// src/controllers/authController.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sequelize from '../config/database.js';
import { User, Client, Concessionaria } from '../models/index.js';

export const register = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Dados incompletos' });

    const existing = await User.findOne({ where: { email } });
    if (existing) { await t.rollback(); return res.status(409).json({ message: 'Email já cadastrado' }); }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash, role }, { transaction: t });

    if (role === 'client') {
      const { cpf, telefone, endereco } = req.body;
      await Client.create({ user_id: user.id, cpf, telefone, endereco }, { transaction: t });
    } else if (role === 'concessionaria') {
      const { nome, cnpj, telefone, email_comercial, endereco } = req.body;
      await Concessionaria.create({ user_id: user.id, nome, cnpj, telefone, email_comercial, endereco }, { transaction: t });
    }

    await t.commit();
    return res.status(201).json({ id: user.id, email: user.email, role: user.role });
  } catch (err) {
    await t.rollback();
    console.error(err);
    return res.status(500).json({ message: 'Erro ao registrar' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Dados incompletos' });

    // buscar o usuário (sem forçar inclusão de concessionária)
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Credenciais inválidas' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Credenciais inválidas' });

    // objeto para payload do token
    const tokenPayload = { id: user.id, role: user.role };

    // objeto user retornado ao front (limpo)
    const userResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    // se for concessionária, tente carregar a concessionária vinculada
    if (user.role === 'concessionaria') {
      const concessionaria = await Concessionaria.findOne({ where: { user_id: user.id } });
      if (!concessionaria) {
        // Se você quiser permitir login mesmo sem concessionária, altere aqui para não retornar 403.
        return res.status(403).json({ message: 'Concessionária não encontrada no sistema' });
      }

      tokenPayload.concessionaria_id = concessionaria.id;
      userResponse.concessionaria = {
        id: concessionaria.id,
        nome: concessionaria.nome,
        cnpj: concessionaria.cnpj,
        telefone: concessionaria.telefone,
        email_comercial: concessionaria.email_comercial,
        endereco: concessionaria.endereco
      };
    }

    // se for client, opcionalmente buscar dados do Client
    if (user.role === 'client') {
      const client = await Client.findOne({ where: { user_id: user.id } });
      if (client) {
        userResponse.client = {
          id: client.id,
          cpf: client.cpf,
          telefone: client.telefone,
          endereco: client.endereco
        };
      }
    }

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '1d'
    });

    return res.json({
      token,
      user: userResponse
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro no login' });
  }
};
