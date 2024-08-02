import MoodleService from '../utils/https.js';
import UserRegistration from '../dtos/createUser.dto.js';

const moodleService = new MoodleService();

export default function createUser(req, res) {
    try {
        // Crea una nueva instancia de UserRegistration, asegurándote de que los datos son válidos
        const newUser = new UserRegistration(req.body);
        newUser.validate();  // Suponiendo que hay una función de validación

        moodleService.core_user_create_users([newUser])
            .then(response => {

                if (response.message == 'Detectado valor de parámetro no válido' )
                    res.status(500).json({ message: "El usuario ya esta creado", error: error.toString() });

                else if (!res.headersSent) {
                    res.status(200).json({ message: "Usuario creado exitosamente", data: response });
                }
            })
            .catch(error => {
                // Manejo de errores de la promesa
                if (!res.headersSent) {
                    res.status(500).json({ message: "Error al crear el usuario", error: error.toString() });
                }
            });
    } catch (error) {
        // Captura errores en la creación del DTO o en la validación
        if (!res.headersSent) {
            res.status(400).json({ message: "Error en los datos de entrada", error: error.message });
        }
    }
}