import MoodleService from "../utils/moodleIntegrationService.js";

const moodleService = new MoodleService();

export default async function getUser(req) {
  try {
    if (!req) {
    }
    const response = await moodleService.core_user_get_users(req.toLowerCase());
    if (response) {
      return response[0];
    } else {
      console.error("No users found (getUsers)");
    }
  } catch (error) {
    console.error("Error fetching users:", error.message);
  }
}
