import MoodleService from '../utils/https.js';
import getEnrol from '../dtos/getEnrol.dto.js'


const moodleService = new MoodleService();

export default async function getenrols(req, res) {
    try {
        const result = await moodleService.core_course_get_courses_by_field(req.body.shortname_course)
        return result

    } catch (error) {

        console.error("Error en los datos de entrada:", error);
        if (!res.headersSent) {
            res.status(400).json({ message: "Error en los datos de entrada", error: error.message });
        }
    }
}
