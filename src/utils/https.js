import axios from "axios";
import qs from "qs";
import dotenv from "dotenv";
dotenv.config();

export default class MoodleService {
  constructor() {
    this.token = process.env.MOODLE_TOKEN;
    this.url = process.env.MOODLE_URL;
    if (!this.token || !this.url) {
      throw new Error("Moodle API token or URL is not defined in .env.");
    }
    this.options = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
  }

  async callMoodleAPI(params) {
    try {
      const response = await axios.post(this.url, qs.stringify(params, { arrayFormat: "indices" }), this.options);
      return response.data;
    } catch (error) {
      console.error("Error in Moodle API request:", error.message);
      throw error;
    }
  }

  async core_user_create_users(users) {
    const params = {
      wstoken: this.token,
      wsfunction: "core_user_create_users",
      moodlewsrestformat: "json",
      users: users,
    };
    return await this.callMoodleAPI(params);
  }

  async core_user_update_users(users) {
    const params = {
      wstoken: this.token,
      wsfunction: "core_user_update_users",
      moodlewsrestformat: "json",
      users: users,
    };
    return await this.callMoodleAPI(params);
  }

  async core_user_get_users(user) {
    const params = {
      wstoken: this.token,
      wsfunction: "core_user_get_users_by_field",
      moodlewsrestformat: "json",
      field : "username",
      "values[0]": user
      //criteria: [{ key: "username", value: user }],
    };
    return await this.callMoodleAPI(params);
  }

  async enrol_manual_enrol_users(enrolments) {
    const params = {
      wstoken: this.token,
      wsfunction: "enrol_manual_enrol_users",
      moodlewsrestformat: "json",
      enrolments: enrolments,
    };
    return await this.callMoodleAPI(params);
  }

  async enrol_manual_unenrol_users(enrolments) {
    const params = {
      wstoken: this.token,
      wsfunction: "enrol_manual_unenrol_users",
      moodlewsrestformat: "json",
      enrolments: enrolments,
    };
    return await this.callMoodleAPI(params);
  }

  async suspendUser(userId) {
    const params = {
      wstoken: this.token,
      wsfunction: "core_user_update_users",
      moodlewsrestformat: "json",
      users: [{
        id: userId,
        suspended: 1  // Establecer el estado de suspensión a '1' para suspender al usuario
    }],
    };
    return await this.callMoodleAPI(params);
  }

  async activateUser(userId) {
    const params = {
      wstoken: this.token,
      wsfunction: "core_user_update_users",
      moodlewsrestformat: "json",
      users: [{
        id: userId,
        suspended: 0  // Establecer el estado de activacion a '0' para suspender al usuario
    }],
    };
    return await this.callMoodleAPI(params);
  }

  async core_course_get_courses_by_field(shortname) {
    const params = {
      wstoken: this.token,
      wsfunction: "core_course_get_courses_by_field",
      moodlewsrestformat: "json",
      field: "shortname",
      value: shortname,
    };
    return await this.callMoodleAPI(params);
  }

  async local_wsgetroles_get_roles() {
    const params = {
      wstoken: this.token,
      wsfunction: "local_wsgetroles_get_roles",
      moodlewsrestformat: "json",
    };
    return await this.callMoodleAPI(params);
  }

  async core_group_add_group_members(members) {
    const params = {
      wstoken: this.token,
      wsfunction: "core_group_add_group_members",
      moodlewsrestformat: "json",
      members: members,
    };
    return await this.callMoodleAPI(params);
  }

  async core_group_delete_group_members(members) {
    const params = {
      wstoken: this.token, 
      wsfunction: "core_group_delete_group_members",
      moodlewsrestformat: "json",
      members:members
    };
    return await this.callMoodleAPI(params);
  }

  async core_group_create_groups(members) {
    const params = {
      wstoken: this.token,
      wsfunction: "core_group_create_groups",
      moodlewsrestformat: "json",
      members: members,
    };
    return await this.callMoodleAPI(params);
  }

  async core_group_get_course_groups(courseId) {
    const params = {
      wstoken: this.token,
      wsfunction: "core_group_get_course_groups",
      moodlewsrestformat: "json",
      courseid: courseId,
    };
    return await this.callMoodleAPI(params);
  }

  async core_enrol_get_users_courses(userId) {
    const params = {
      wstoken: this.token,
      wsfunction: "core_enrol_get_users_courses",
      moodlewsrestformat: "json",
      userid: userId,
    };
    return await this.callMoodleAPI(params);
  }

  async core_group_get_course_user_groups(courseId, userId) {
    const params = {
      wstoken: this.token,
      wsfunction: "core_group_get_course_user_groups",
      moodlewsrestformat: "json",
      courseid: courseId,
      userid: userId,
    };
    return await this.callMoodleAPI(params);
  }
}
