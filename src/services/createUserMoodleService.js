
import MoodleService from '../utils/https.js';
//  const MoodleService = require('../utils/https.js');


const moodleService = new MoodleService();


export function createUser(req, res) {

    // Llamar a la función para crear usuarios en Moodle
    moodleService.core_user_create_users(req)
        .then(response => {
            res.status(200).json({ message: "Usuario creado exitosamente", data: response });
        })
        .catch(error => {
            res.status(500).json({ message: "Error al crear el usuario", error: error.toString() });
        });
}
// Simulando los objetos req y res
const users = [{
    username: 'nuevo_usuario',
    password: 'Password123!', // Asegúrate de cumplir con las políticas de contraseñas de Moodle
    firstname: 'Nombre',
    lastname: 'Apellido',
    email: 'usuario@example.com',
    auth: 'manual', // Método de autenticación, por defecto 'manual' si no se especifica
    idnumber: '12345', // Opcional, un identificador único
    lang: 'es', // Opcional, idioma del usuario, por defecto 'en'
    timezone: 'America/New_York', // Opcional, zona horaria, por defecto 'UTC'
    city: 'Ciudad', // Opcional
    country: 'ES' // Opcional, código de país ISO-3166
}];

const res = {
    status: function (code) {
        console.log(`Status code set to: ${code}`);
        return this;  // permite el encadenamiento
    },
    json: function (data) {
        console.log('Sending response:', JSON.stringify(data, null, 2));
    }
};
createUser(users, res);
// Aquí necesitas importar MoodleService y crear una instancia si no la has creado dentro de createUse