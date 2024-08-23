import MoodleService from '../utils/https.js';
import { User } from '../models/UserModel.js';
import UserUpdate from '../dtos/updateUser.dto.js';
import getUser from './getUserMoodleService.js';
const moodleService = new MoodleService();

export default async function UpdateUser(req) {
    try {
        const users = await getUser(req.username);
        const resultUser = users;
        const userid = resultUser.id;
        await moodleService.activateUser(userid)
        req = {
            ...req,
            id: userid,
          }
        // Crea un objeto con los datos del usuario
        const userDto = {
            id: req.id,
            username: req.username,
            firstname: req.firstname,
            lastname: req.lastname,
            email: req.email,
            city: req.city
        };
        const newUserUpdate = new UserUpdate(userDto);
        newUserUpdate.validate();

        await moodleService.core_user_update_users([newUserUpdate]);

        let user = await User.findOne({ where: { username: req.username } });
        await user.update(req = {
            ...req,
            state: req.state,
          });
        console.log("Usuario existente actualizado.",{ username: req.username });
        return { username: req.username};

    } catch (error) {
        console.error("Error en los datos de entrada de update:", error);
    }
}
