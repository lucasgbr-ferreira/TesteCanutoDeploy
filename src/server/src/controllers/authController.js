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

    const user = await User.findOne({ 
      where: { email },
      include: [{
        model: Concessionaria,
        as: 'gestor',
        required: false
      }]
    });
    
    if (!user) return res.status(401).json({ message: 'Credenciais inválidas' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Credenciais inválidas' });

    // VERIFICAÇÃO CRÍTICA: Só permitir login se for uma concessionária
    if (user.role !== 'concessionaria') {
      return res.status(403).json({ 
        message: 'Acesso restrito apenas para concessionárias cadastradas' 
      });
    }

    // Verificar se a concessionária existe no banco
    const concessionaria = await Concessionaria.findOne({ 
      where: { user_id: user.id } 
    });

    if (!concessionaria) {
      return res.status(403).json({ 
        message: 'Concessionária não encontrada no sistema' 
      });
    }

    const token = jwt.sign({ 
      id: user.id, 
      role: user.role,
      concessionaria_id: concessionaria.id 
    }, process.env.JWT_SECRET, { 
      expiresIn: process.env.JWT_EXPIRES_IN || '1d' 
    });

    return res.json({ 
      token, 
      user: { 
        id: user.id, 
        name: user.name, 
        email: user.email, 
        role: user.role,
        concessionaria: {
          id: concessionaria.id,
          nome: concessionaria.nome,
          cnpj: concessionaria.cnpj
        }
      } 
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro no login' });
  }
};