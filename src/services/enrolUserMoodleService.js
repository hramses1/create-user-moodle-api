import MoodleService from '../utils/https.js';
import UserEnRol from '../dtos/enrolUser.dto.js';

const moodleService = new MoodleService();

export default async function enrolUser(req) {
    try {
        const userEnRol = new UserEnRol(req); 
        userEnRol.validate(); 
        const enrolResponse = await moodleService.enrol_manual_enrol_users([userEnRol]);
    } catch (error) {
        console.error("Error en los datos de entrada de enrolUser:", error);
    }
}
