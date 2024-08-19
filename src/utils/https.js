// En MoodleService.js
import axios from "axios";
import qs from "qs";
import dotenv from "dotenv";
dotenv.config();

export default class MoodleService {
  constructor() {
    this.token = process.env.MOODLE_TOKEN; // Asegúrate de definir esta variable en tu .env
    this.url = process.env.MOODLE_URL; // Asegúrate de definir esta variable en tu .env
    this.options = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
  }

  core_user_create_users(users) {
    if (!this.token || !this.url) {
      console.error(
        "Moodle API token or URL is not defined. Check your .env file."
      );
      throw new Error("Moodle API token or URL is not defined.");
    }

    const params = {
      wstoken: this.token,
      wsfunction: "core_user_create_users",
      moodlewsrestformat: "json",
      users: users,
    };

    return axios
      .post(
        this.url,
        qs.stringify(params, { arrayFormat: "indices" }),
        this.options
      )
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  core_user_update_users(users) {
    if (!this.token || !this.url) {
      console.error(
        "Moodle API token or URL is not defined. Check your .env file."
      );
      throw new Error("Moodle API token or URL is not defined.");
    }

    const params = {
      wstoken: this.token,
      wsfunction: "core_user_update_users",
      moodlewsrestformat: "json",
      users: users,
    };

    return axios
      .post(
        this.url,
        qs.stringify(params, { arrayFormat: "indices" }),
        this.options
      )
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  core_user_get_users(user) {
    if (!this.token || !this.url) {
      console.error(
        "Moodle API token or URL is not defined. Check your .env file."
      );
      throw new Error("Moodle API token or URL is not defined.");
    }

    const params = {
      wstoken: this.token,
      wsfunction: "core_user_get_users",
      moodlewsrestformat: "json",
      criteria: [
        {
          key: "username",
          value: user,
        },
      ],
    };

    return axios
      .post(
        this.url,
        qs.stringify(params, { arrayFormat: "indices" }),
        this.options
      )
      .then((response) => response.data.users)
      .catch((error) => {
        throw error;
      });
  }
  enrol_manual_enrol_users(enrolments) {
    if (!this.token || !this.url) {
      console.error(
        "Moodle API token or URL is not defined. Check your .env file."
      );
      throw new Error("Moodle API token or URL is not defined.");
    }

    const params = {
      wstoken: this.token,
      wsfunction: "enrol_manual_enrol_users",
      moodlewsrestformat: "json",
      enrolments: enrolments,
    };

    return axios
      .post(
        this.url,
        qs.stringify(params, { arrayFormat: "indices" }),
        this.options
      )
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  enrol_manual_unenrol_users(enrolments) {
    if (!this.token || !this.url) {
      console.error(
        "Moodle API token or URL is not defined. Check your .env file."
      );
      throw new Error("Moodle API token or URL is not defined.");
    }

    const params = {
      wstoken: this.token,
      wsfunction: "enrol_manual_unenrol_users",
      moodlewsrestformat: "json",
      enrolments: enrolments,
    };

    return axios
      .post(
        this.url,
        qs.stringify(params, { arrayFormat: "indices" }),
        this.options
      )
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  core_course_get_courses_by_field(shortname) {
    if (!this.token || !this.url) {
      console.error(
        "Moodle API token or URL is not defined. Check your .env file."
      );
      throw new Error("Moodle API token or URL is not defined.");
    }

    const params = {
      wstoken: this.token,
      wsfunction: "core_course_get_courses_by_field",
      moodlewsrestformat: "json",
      field: "shortname",
      value: shortname,
    };

    return axios
      .post(
        this.url,
        qs.stringify(params, { arrayFormat: "indices" }),
        this.options
      )
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  local_wsgetroles_get_roles() {
    if (!this.token || !this.url) {
      console.error(
        "Moodle API token or URL is not defined. Check your .env file."
      );
      throw new Error("Moodle API token or URL is not defined.");
    }

    const params = {
      wstoken: this.token,
      wsfunction: "local_wsgetroles_get_roles",
      moodlewsrestformat: "json",
    };

    return axios
      .post(
        this.url,
        qs.stringify(params, { arrayFormat: "indices" }),
        this.options
      )
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  core_group_add_group_members(members) {
    if (!this.token || !this.url) {
      console.error(
        "Moodle API token or URL is not defined. Check your .env file."
      );
      throw new Error("Moodle API token or URL is not defined.");
    }

    const params = {
      wstoken: this.token,
      wsfunction: "core_group_add_group_members",
      moodlewsrestformat: "json",
      members: members,
    };

    return axios
      .post(
        this.url,
        qs.stringify(params, { arrayFormat: "indices" }),
        this.options
      )
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  core_group_delete_group_members(groupId, userId) {
    if (!this.token || !this.url) {
      console.error(
        "Moodle API token or URL is not defined. Check your .env file."
      );
      throw new Error("Moodle API token or URL is not defined.");
    }

    if (!groupId || !userId) {
      throw new Error("GroupId and UserId must be provided and valid.");
    }
    const params = {
      wstoken: this.token,
      wsfunction: "core_group_delete_group_members",
      moodlewsrestformat: "json",
      groupid: parseInt(groupId),
      userids: parseInt(userId)
    };

    return axios
      .post(
        this.url,
        qs.stringify(params, { arrayFormat: "indices" }),
        this.options
      )
      .then((response) => response.data)
      .catch((error) => {
        if (error.response) {
          console.error("Moodle API error:", error.response.data);
          throw new Error(`Moodle API error: ${error.response.data.error}`);
        } else {
          console.error("Error in API request:", error.message);
          throw new Error("Failed to connect to Moodle API");
        }
      });
  }

  core_group_create_groups(members) {
    if (!this.token || !this.url) {
      console.error(
        "Moodle API token or URL is not defined. Check your .env file."
      );
      throw new Error("Moodle API token or URL is not defined.");
    }

    const params = {
      wstoken: this.token,
      wsfunction: "core_group_create_groups",
      moodlewsrestformat: "json",
      members: members,
    };

    return axios
      .post(
        this.url,
        qs.stringify(params, { arrayFormat: "indices" }),
        this.options
      )
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  core_group_get_course_groups(courseId) {
    if (!this.token || !this.url) {
      console.error(
        "Moodle API token or URL is not defined. Check your .env file."
      );
      throw new Error("Moodle API token or URL is not defined.");
    }

    const params = {
      wstoken: this.token,
      wsfunction: "core_group_get_course_groups",
      moodlewsrestformat: "json",
      courseid: courseId,
    };

    return axios
      .post(
        this.url,
        qs.stringify(params, { arrayFormat: "indices" }),
        this.options
      )
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  core_enrol_get_users_courses(userId) {
    if (!this.token || !this.url) {
      console.error(
        "Moodle API token or URL is not defined. Check your .env file."
      );
      throw new Error("Moodle API token or URL is not defined.");
    }

    const params = {
      wstoken: this.token,
      wsfunction: "core_enrol_get_users_courses",
      moodlewsrestformat: "json",
      userid: userId,
    };

    return axios
      .post(
        this.url,
        qs.stringify(params, { arrayFormat: "indices" }),
        this.options
      )
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  core_group_get_course_user_groups(courseId, userId) {
    if (!this.token || !this.url) {
      console.error(
        "Moodle API token or URL is not defined. Check your .env file."
      );
      throw new Error("Moodle API token or URL is not defined.");
    }

    const params = {
      wstoken: this.token,
      wsfunction: "core_group_get_course_user_groups",
      moodlewsrestformat: "json",
      courseid: courseId,
      userid: userId,
    };

    return axios
      .post(
        this.url,
        qs.stringify(params, { arrayFormat: "indices" }),
        this.options
      )
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }
}
