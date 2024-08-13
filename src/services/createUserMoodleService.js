import MoodleService from '../utils/https.js';
import UserRegistration from '../dtos/createUser.dto.js';

const moodleService = new MoodleService();

export default function createUser(req, res) {
    try {
        // Asegura que los datos de entrada son válidos antes de proceder
        const newUser = new UserRegistration(req.body);
        newUser.validate(); // Asumiendo que `validate()` lanza un error si hay algún problema

        // Realiza la petición al servicio de Moodle
        moodleService.core_user_create_users([newUser])
            .then(response => {
                // Solo envía la respuesta si no se ha enviado una respuesta anteriormente
                    res.status(200).json({ message: "Usuario Creado", data: response});
            })
            .catch(error => {
                // Maneja errores que pueden ocurrir durante la llamada al API
                console.error("Error al crear usuario en Moodle:", error);
                    res.status(500).json({ message: "Error al crear el usuario", error: error.toString() });
            });
    } catch (error) {
        // Maneja errores específicos de la validación o creación del DTO
        console.error("Error en los datos de entrada:", error);
        if (!res.headersSent) {
            res.status(400).json({ message: "Error en los datos de entrada", error: error.message });
        }
    }
}
