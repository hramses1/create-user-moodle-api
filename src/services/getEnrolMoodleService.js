import MoodleService from '../utils/https.js';

const moodleService = new MoodleService();

export default function getenrols(req, res) {
    try {
        const enrolvalue = new getEnrol(req.body);
        enrolvalue.validate(); 

        moodleService.core_course_get_courses_by_field([enrolvalue])
            .then(response => {

                res.status(200).json({ message: "Asignatura encontrada", data: response});
            })
            .catch(error => {
                console.error("Error al encontrar la asignatura en Moodle:", error);
                res.status(500).json({ message: "Error al encontrar la asignatura", error: error.toString() });
            });
    } catch (error) {

        console.error("Error en los datos de entrada:", error);
        if (!res.headersSent) {
            res.status(400).json({ message: "Error en los datos de entrada", error: error.message });
        }
    }
}
