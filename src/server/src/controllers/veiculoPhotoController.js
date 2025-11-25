import VeiculoPhoto from "../models/VeiculoPhoto.js";
import Veiculo from "../models/Veiculo.js";

export const uploadVeiculoPhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Nenhuma imagem enviada" });
    }

    const veiculoId = req.params.veiculoId;
    const userId = req.user.id;

    // Verificar se o veículo pertence à concessionária do usuário
    const veiculo = await Veiculo.findOne({
      where: { 
        id: veiculoId,
        concessionaria_id: req.user.concessionaria_id 
      }
    });

    if (!veiculo) {
      return res.status(404).json({ message: "Veículo não encontrado ou não pertence à sua concessionária" });
    }

    // Deletar foto existente (se houver)
    await VeiculoPhoto.destroy({
      where: { veiculo_id: veiculoId }
    });

    // Salvar nova foto
    const photo = await VeiculoPhoto.create({
      veiculo_id: veiculoId,
      filename: req.file.originalname,
      content_type: req.file.mimetype,
      size: req.file.size,
      data: req.file.buffer
    });

    return res.json({ 
      message: "Foto do veículo atualizada com sucesso", 
      photo: {
        id: photo.id,
        filename: photo.filename,
        content_type: photo.content_type,
        size: photo.size,
        created_at: photo.created_at
      }
    });
  } catch (err) {
    console.error("Erro no upload da foto do veículo:", err);
    return res.status(500).json({ message: "Erro ao enviar foto do veículo" });
  }
};

export const getVeiculoPhoto = async (req, res) => {
  try {
    const photo = await VeiculoPhoto.findOne({
      where: { veiculo_id: req.params.veiculoId }
    });

    if (!photo) {
      return res.status(404).json({ message: "Foto do veículo não encontrada" });
    }

    res.set("Content-Type", photo.content_type);
    return res.send(photo.data);
  } catch (err) {
    console.error("Erro ao buscar foto do veículo:", err);
    return res.status(500).json({ message: "Erro ao carregar foto do veículo" });
  }
};