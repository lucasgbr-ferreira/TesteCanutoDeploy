import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

export default async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Token não enviado' });

  const [, token] = authHeader.split(' ');
  if (!token) return res.status(401).json({ message: 'Token inválido' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(payload.id);
    if (!user) return res.status(401).json({ message: 'Usuário não encontrado' });

    req.user = { id: user.id, role: user.role, concessionaria_id: payload.concessionaria_id };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido ou expirado' });
  }
}