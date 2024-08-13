import MoodleService from '../utils/https.js';
import UserEnRol from '../dtos/enrolUser.dto.js';

const moodleService = new MoodleService();

export default function enrolUser(req, res) {
    try {
        const enrolUser = new UserEnRol(req.body);
        enrolUser.validate(); 

        moodleService.enrol_manual_enrol_users([enrolUser])
            .then(response => {

                res.status(200).json({ message: "Usuario asignado", data: response});
            })
            .catch(error => {
                console.error("Error al asignar al usuario en Moodle:", error);
                res.status(500).json({ message: "Error al asignar el usuario", error: error.toString() });
            });
    } catch (error) {

        console.error("Error en los datos de entrada:", error);
        if (!res.headersSent) {
            res.status(400).json({ message: "Error en los datos de entrada", error: error.message });
        }
    }
}
