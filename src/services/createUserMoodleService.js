import MoodleService from '../utils/https.js';
import UserRegistration from '../dtos/createUser.dto.js';

const moodleService = new MoodleService();

export default async function createUser(req, res) {
    try {

        const newUser = new UserRegistration(req.body);
        newUser.validate(); // Asumiendo que `validate()` lanza un error si hay algún problema
        // Realiza la petición al servicio de Moodle
        await moodleService.core_user_create_users([newUser])
    } catch (error) {
        // Maneja errores específicos de la validación o creación del DTO
        console.error("Error en los datos de entrada:", error);

    }
}
