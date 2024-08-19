import MoodleService from '../utils/https.js';
import UserRegistration from '../dtos/createUser.dto.js';
import {v4 as uuidv4} from 'uuid';
import { User } from '../models/UserModel.js';
import crypto from 'crypto'

const moodleService = new MoodleService();


function generateSecurePassword(length = 8) {
    return crypto.randomBytes(length)
                 .toString('base64')  // Convertir a base64 para obtener caracteres legibles
                 .slice(0, length);  // Asegurar la longitud correcta
}

export default async function createUser(req) {
    try {
        // Genera una contraseña segura y un UUID
        const securePassword = generateSecurePassword(12);
        let myuuid = uuidv4();

        // Crea un objeto con los datos del usuario
        const userDto = {
            username: req.username,
            password: securePassword,
            firstname: req.firstname,
            lastname: req.lastname,
            email: req.email,
            city: req.city,
            country: req.country,
            lang: req.lang,
            timezone: req.timezone,
            idnumber: myuuid
        };

        // Intentar crear el usuario en Moodle
        const newUserRegistration = new UserRegistration(userDto);
        newUserRegistration.validate();
        await moodleService.core_user_create_users([newUserRegistration]);

        // Buscar si el usuario existe localmente
        let user = await User.findOne({ where: { username: req.username } });
        
        const localUserDto = { ...userDto, state: req.state };

        if (!user) {
            // Si el usuario no existe, crearlo localmente
            user = await User.create(localUserDto);
            console.log("Nuevo usuario creado:", { username: req.username, password: securePassword });
        } else {
            // Si el usuario ya existe, actualizarlo con la nueva información
            await user.update(localUserDto);
            console.log("Usuario existente actualizado.",{ username: req.username, password: securePassword });
        }
        
        return { username: req.username, password: securePassword };

    } catch (error) {
        console.error("Error en los datos de entrada en Create:", error);
    }
}
