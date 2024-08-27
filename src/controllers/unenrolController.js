import unenrolUser from "../services/unenrolUserMoodleService.js";

export default async function unenrolUsersController(req, res) {
  try {
    const username = req.body;

    const unenrolUsers = await unenrolUser(username);

    return unenrolUsers;
  } catch {
    console.error("Error in unenrolUser process:", error);
    return {
      status: "Error",
      message: "An error occurred during the unenrolment process.",
    };
  }
}
