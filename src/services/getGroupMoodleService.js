import MoodleService from '../utils/MoodleIntegrationService.js';

const moodleService = new MoodleService();

async function getGroup(courseid) {
    try {
        const groups = await moodleService.core_group_get_course_groups(courseid);
        return groups;
    } catch (error) {
        console.error("Error al obtener grupos del curso:", error);
        throw error;
    }
}

async function getGroupUser(courseId, userId) {
    try {
        const groups = await moodleService.core_group_get_course_user_groups(courseId, userId);
        return groups;
    } catch (error) {
        console.error("Error al obtener grupos del usuario en el curso:", error);
        throw error;
    }
}

export{getGroup , getGroupUser}
