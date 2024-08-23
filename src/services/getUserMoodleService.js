import MoodleService from '../utils/https.js';

const moodleService = new MoodleService();

export default async function getUser(req, res) {
    try {
        if (!req) {
        }
        const response = (await moodleService.core_user_get_users(req));
        if (response) {
            return response[0]
        } else {
            console.log('No users found (getUsers)');
        }
    } catch (error) {
        console.error('Error fetching users:', error.message);
    }
}