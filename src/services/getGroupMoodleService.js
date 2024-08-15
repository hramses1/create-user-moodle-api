import MoodleService from '../utils/https.js';

const moodleService = new MoodleService();

export default async function getGroup(courseid) {
    try {
        const group  = await moodleService.core_group_get_course_groups(courseid)
        return group
    } catch (error) {
        console.error("Error en los datos de entrada:", error);
    }
}
