import createUser from "../services/createUserMoodleService.js";
import getUser from "../services/getUserMoodleService.js";

export default async function createUsers(req, res) {
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
      await createUser(req)
      return 'Usuario no encontrado, creando nuevo usuario.'
    }else{

      console.log("El usuario ya se encuentra registrado")
      return 'El usuario ya se encuentra registrado'

    }
  } catch (error) {
    console.error("Error en la operación:", error);
  }
}
