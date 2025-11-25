import { Concessionaria, User } from '../models/index.js';

export const createConcessionaria = async (req, res) => {
  try {
    const data = req.body;
    const c = await Concessionaria.create(data);
    return res.status(201).json(c);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro' });
  }
};

export const getConcessionaria = async (req, res) => {
  try {
    const { id } = req.params;

    const c = await Concessionaria.findByPk(id, {
      include: [
        { model: User, as: 'user', attributes: ['id', 'name', 'email'] }
      ]
    });

    if (!c) return res.status(404).json({ message: 'Não encontrada' });
    return res.json(c);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro' });
  }
};

export const updateConcessionaria = async (req, res) => {
  try {
    const { id } = req.params;
    const c = await Concessionaria.findByPk(id);
    if (!c) return res.status(404).json({ message: 'Não encontrada' });
    await c.update(req.body);
    return res.json(c);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro' });
  }
};

export const deleteConcessionaria = async (req, res) => {
  try {
    const { id } = req.params;
    const c = await Concessionaria.findByPk(id);
    if (!c) return res.status(404).json({ message: 'Não encontrada' });
    await c.destroy();
    return res.status(204).send();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro' });
  }
};
