import MoodleService from '../utils/https.js';


const moodleService = new MoodleService();

export default async function getUser(req, res) {
        const response = await moodleService.core_user_get_users(req)
        return response
    }