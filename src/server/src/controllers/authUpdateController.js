import sequelize from '../config/database.js';
import { User, Client, Concessionaria } from '../models/index.js';

export async function updateUserData(req, res) {
  const t = await sequelize.transaction();
  try {
    if (!req.user || !req.user.id) {
      await t.rollback();
      return res.status(401).json({ message: 'Não autenticado' });
    }

    const userId = req.user.id;
    const { name, email, cpf, cnpj, telefone, endereco } = req.body;
    const userUpdates = {};
    if (name !== undefined) userUpdates.name = name;
    if (email !== undefined) userUpdates.email = email;
    if (Object.keys(userUpdates).length > 0) {
      await User.update(userUpdates, { where: { id: userId }, transaction: t });
    }
    const role = req.user.role || (req.body.role); 
    if (role === 'client') {
      const client = await Client.findOne({ where: { user_id: userId } });
      if (client) {
        const clientUpdates = {};
        if (cpf !== undefined) clientUpdates.cpf = cpf;
        if (telefone !== undefined) clientUpdates.telefone = telefone;
        if (endereco !== undefined) clientUpdates.endereco = endereco;
        if (Object.keys(clientUpdates).length > 0) {
          await Client.update(clientUpdates, { where: { user_id: userId }, transaction: t });
        }
      } else {
        await Client.create({
          user_id: userId,
          cpf: cpf || null,
          telefone: telefone || null,
          endereco: endereco || null
        }, { transaction: t });
      }
    } else if (role === 'concessionaria') {
      const concession = await Concessionaria.findOne({ where: { user_id: userId } });
      if (concession) {
        const concessionUpdates = {};
        if (cnpj !== undefined) concessionUpdates.cnpj = cnpj;
        if (telefone !== undefined) concessionUpdates.telefone = telefone;
        if (endereco !== undefined) concessionUpdates.endereco = endereco;
        if (Object.keys(concessionUpdates).length > 0) {
          await Concessionaria.update(concessionUpdates, { where: { user_id: userId }, transaction: t });
        }
      } else {
        await Concessionaria.create({
          user_id: userId,
          nome: req.body.nome || null,
          cnpj: cnpj || null,
          telefone: telefone || null,
          email_comercial: req.body.email_comercial || null,
          endereco: endereco || null
        }, { transaction: t });
      }
    }

    await t.commit();
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] }
    });

    return res.json({ message: 'Atualizado com sucesso', user });
  } catch (err) {
    await t.rollback();
    console.error('authUpdateController.updateUserData error:', err);
    return res.status(500).json({ message: 'Erro ao atualizar dados' });
  }
}
