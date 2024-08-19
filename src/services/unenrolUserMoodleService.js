import MoodleService from '../utils/https.js';
import getUser from './getUserMoodleService.js';
import getenrols from './getEnrolMoodleService.js';
import removeGroup from './removeGroupMoodleService.js';
import { getGroupUser } from './getGroupMoodleService.js';

const moodleService = new MoodleService();

export default async function unenrolUser(req) {
    try {
        const users = await getUser(req.body.username);

        const courses = await moodleService.core_enrol_get_users_courses(users[0].id)

        let courseid = null;
        let idgroup = null;

        courses.filter(result => {
            courseid = result.id
        })

        await removeGroup(courseid,users[0].id)


        
        //await moodleService.enrol_manual_unenrol_users(groupid,userId);
    } catch (error) {
        console.error("Error en los datos de entrada de unenrolUser:", error);
    }
}
