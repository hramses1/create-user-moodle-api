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

    core_user_get_users(user){

        if (!this.token || !this.url) {
            console.error("Moodle API token or URL is not defined. Check your .env file.");
            throw new Error("Moodle API token or URL is not defined.");
        }

        const params = {
            wstoken: this.token,
            wsfunction: 'core_user_get_users',
            moodlewsrestformat: 'json',
            criteria: user
        };

        return axios.post(this.url, qs.stringify(params, { arrayFormat: 'indices' }), this.options)
            .then(response => response.data.users)
            .catch(error => {
                throw error;
            });
    }
    enrol_manual_enrol_users(enrolments) {
        if (!this.token || !this.url) {
            console.error("Moodle API token or URL is not defined. Check your .env file.");
            throw new Error("Moodle API token or URL is not defined.");
        }

        const params = {
            wstoken: this.token,
            wsfunction: 'enrol_manual_enrol_users',
            moodlewsrestformat: 'json',
            enrolments: enrolments
        };

        return axios.post(this.url, qs.stringify(params, { arrayFormat: 'indices' }), this.options)
            .then(response => response.data)
            .catch(error => {
                throw error;
            });
    }

    core_course_get_courses_by_field(shortname) {
        if (!this.token || !this.url) {
            console.error("Moodle API token or URL is not defined. Check your .env file.");
            throw new Error("Moodle API token or URL is not defined.");
        }

        const params = {
            wstoken: this.token,
            wsfunction: 'core_course_get_courses_by_field',
            moodlewsrestformat: 'json',
            field: 'shortname',
            value: shortname
        };

        return axios.post(this.url, qs.stringify(params, { arrayFormat: 'indices' }), this.options)
            .then(response => response.data)
            .catch(error => {
                throw error;
            });
    }

    local_wsgetroles_get_roles() {
        if (!this.token || !this.url) {
            console.error("Moodle API token or URL is not defined. Check your .env file.");
            throw new Error("Moodle API token or URL is not defined.");
        }

        const params = {
            wstoken: this.token,
            wsfunction: 'local_wsgetroles_get_roles',
            moodlewsrestformat: 'json',
        };

        return axios.post(this.url, qs.stringify(params, { arrayFormat: 'indices' }), this.options)
            .then(response => response.data)
            .catch(error => {
                throw error;
            });
    }
}