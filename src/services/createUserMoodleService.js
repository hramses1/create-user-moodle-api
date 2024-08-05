import MoodleService from '../utils/https.js';
import UserSearch from '../dtos/getUser.dto.js';
import UserRegistration from '../dtos/createUser.dto.js';

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

        moodleService.core_user_get_users([userSearch])
            .then(response => {
                if (response.length === 0) {
                    console.log('Usuario no encontrado, creando nuevo usuario.');
                    return Promise.all([
                        Promise.resolve([]), // Array vacío indicando que no se encontró el usuario
                        moodleService.core_user_create_users([newUser])
                    ]);
                } else {
                    console.log('Usuario encontrado.');
                    return Promise.resolve([response, null]); // No crear un nuevo usuario
                }
            })
            .then(([getUsersResponse, createResponse]) => {
                if (createResponse) {
                    res.status(200).json({
                        message: "Usuario creado exitosamente",
                        createResponse,
                        getUsersResponse
                    });
                } else {
                    res.status(200).json({
                        message: "Usuario encontrado exitosamente",
                        getUsersResponse
                    });
                }
            })
            .catch(error => {
                // Manejo de errores de la promesa
                if (!res.headersSent) {
                    res.status(500).json({ message: "Error al buscar o crear el usuario", error: error.toString() });
                }
            });
    } catch (error) {
        // Captura errores en la creación del DTO o en la validación
        if (!res.headersSent) {
            res.status(400).json({ message: "Error en los datos de entrada", error: error.message });
        }
    }
}
