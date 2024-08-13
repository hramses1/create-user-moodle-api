import createUser from "../services/createUserMoodleService.js";
import getUser from "../services/getUserMoodleService.js";

export default async function enrolUser(req, res) {
  try {


    if (!req.body.username) {
      return res.status(400).json({ message: "Username is required" });
    }
    const verified = {
      key: "username",
      value: req.body.username,
    };

    // Verificar si el usuario existe
    const existingUsers = await getUser(verified);

    if (existingUsers.length === 0) {
      console.log("Usuario no encontrado, creando nuevo usuario.")
      const createResponse = await createUser(req);

      res.status(200).json({
        message: "Usuario creado exitosamente",
        createResponse,
      });
    } else {
      console.log("Usuario encontrado.");
      res.status(200).json({
        message: "Usuario encontrado exitosamente",
        getUsersResponse: existingUsers,
      });
    }
  } catch (error) {
    console.error("Error en la operación:", error);
    if (!res.headersSent) {
      res.status(400).json({
        message: "Error en los datos de entrada",
        error: error.message,
      });
    }
  }
}
