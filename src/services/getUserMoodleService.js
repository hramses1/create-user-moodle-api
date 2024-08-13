import MoodleService from '../utils/https.js';
import UserSearch from '../dtos/getUser.dto.js';

const moodleService = new MoodleService();

export default async function getUser(req, res) {

        const getUsers = new UserSearch(req);
        getUsers.validate(); 
        const response = await moodleService.core_user_get_users([getUsers])
        return response
    }