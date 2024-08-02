import MoodleService from '../utils/https.js';
import UserSearch from '../dtos/getUser.dto.js';

const moodleService = new MoodleService();

export default function getUser(req, res) {
    try {
        const getUser = new UserSearch(req.body);
        getUser.validate(); 

        moodleService.core_user_get_users([getUser])
            .then(response => {

                if (!res.headersSent) {
                    res.status(200).json({ message: "Usuario encontrado", data: response});
                }
            })
            .catch(error => {
                // Manejo de errores de la promesa
                if (!res.headersSent) {
                    res.status(500).json({ message: "Error al buscar el usuario", error: error.toString() });
                }
            });
    } catch (error) {
        // Captura errores en la creación del DTO o en la validación
        if (!res.headersSent) {
            res.status(400).json({ message: "Error en los datos de entrada", error: error.message });
        }
    }
}