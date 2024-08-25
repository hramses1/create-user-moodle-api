import MoodleService from "../utils/MoodleIntegrationService.js";
import { User } from "../models/UserModel.js";
import UserUpdate from "../dtos/updateUser.dto.js";
import getUser from "./getUserMoodleService.js";

const moodleService = new MoodleService();

export default async function UpdateUser(req) {
  try {
    const users = await getUser(req.username);
    if (users.suspended) {
      await moodleService.activateUser(users.id);
    }
    req = {
      ...req,
      id: users.id,
    };
    // Crea un objeto con los datos del usuario
    const userDto = {
      id: req.id,
      username: req.username.toLowerCase(),
      firstname: req.firstname,
      lastname: req.lastname,
      email: req.email,
      city: req.city,
    };
    const newUserUpdate = new UserUpdate(userDto);
    newUserUpdate.validate();

    await moodleService.core_user_update_users([newUserUpdate]);

    let user = await User.findOne({ where: { username: req.username } });
    await user.update(
      (req = {
        ...req,
        state: req.state,
      })
    );
    console.log("Usuario existente actualizado.", { username: req.username });
    return {
        "status": "Success",
        "message": "User updated successfully.",
        "username": req.username
      };
  } catch (error) {
    console.error("Error en los datos de entrada de update:", error);
  }
}
