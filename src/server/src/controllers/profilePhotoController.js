import UserPhoto from "../models/UserPhoto.js";

export const uploadProfilePhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Nenhuma imagem enviada" });
    }

    const userId = req.user.id;

    await UserPhoto.destroy({
      where: { user_id: userId, type: "profile" }
    });

    // salvar nova foto
    const photo = await UserPhoto.create({
      user_id: userId,
      filename: req.file.originalname,
      content_type: req.file.mimetype,
      size: req.file.size,
      data: req.file.buffer,
      type: "profile"
    });

    return res.json({ message: "Foto atualizada", photo });
  } catch (err) {
    return res.status(500).json({ message: "Erro ao enviar foto" });
  }
};

export const getProfilePhoto = async (req, res) => {
  try {
    const photo = await UserPhoto.findOne({
      where: { user_id: req.params.id, type: "profile" }
    });

    if (!photo) {
      return res.status(404).json({ message: "semFoto" });
    }

    res.set("Content-Type", photo.content_type);
    return res.send(photo.data);
  } catch (err) {
    return res.status(500).json({ message: "Erro ao carregar foto" });
  }
};
