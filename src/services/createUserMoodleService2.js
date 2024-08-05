import MoodleService from '../utils/https.js';
import UserSearch from '../dtos/getUser.dto.js';
import UserRegistration from '../dtos/createUser.dto.js';
import getUser from './getUserMoodleService.js';
const moodleService = new MoodleService();

export default function getUsers(req, res) {
    try {
        const newUser = new UserRegistration(req.body);
        newUser.validate();

        const verified = {
            key: "username",
            value: newUser.username
        };
        const userSearch = new UserSearch(verified);
        userSearch.validate();

    } catch (error) {
        // Captura errores en la creación del DTO o en la validación
        if (!res.headersSent) {
            res.status(400).json({ message: "Error en los datos de entrada", error: error.message });
        }
    }
}
