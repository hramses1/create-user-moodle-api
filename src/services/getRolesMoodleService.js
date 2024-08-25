import MoodleService from '../utils/MoodleIntegrationService.js';

const moodleService = new MoodleService();

export default async function getRoles() {
    try {
        const roles  = await moodleService.local_wsgetroles_get_roles()
        return roles
    } catch (error) {
        console.error("Error en los datos de entrada:", error);
    }
}
