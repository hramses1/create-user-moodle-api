// En MoodleService.js
import axios from 'axios';
import qs from 'qs';
import dotenv from 'dotenv';
dotenv.config();

export default class MoodleService {
    constructor() {
        this.token = process.env.MOODLE_TOKEN;  // Asegúrate de definir esta variable en tu .env
        this.url = process.env.MOODLE_URL;      // Asegúrate de definir esta variable en tu .env
        this.options = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
    }

    core_user_create_users(users) {

        if (!this.token || !this.url) {
            console.error("Moodle API token or URL is not defined. Check your .env file.");
            throw new Error("Moodle API token or URL is not defined.");
        }
        
        const params = {
            wstoken: this.token,
            wsfunction: 'core_user_create_users',
            moodlewsrestformat: 'json',
            users: users
        };

        return axios.post(this.url, qs.stringify(params, { arrayFormat: 'indices' }), this.options)
            .then(response => response.data)
            .catch(error => {
                throw error;
            });
    }
}
