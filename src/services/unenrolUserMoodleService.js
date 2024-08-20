import MoodleService from "../utils/https.js";
import getUser from "./getUserMoodleService.js";
import removeGroup from "./removeGroupMoodleService.js";

const moodleService = new MoodleService();

export default async function unenrolUser(req) {
  try {
    if (!req.body.username) {
      console.error("No username provided");
      return;
    }

    const users = await getUser(req.body.username);
    if (!users || users.length === 0) {
      console.error("No user found with the provided username");
      return;
    }

    const user = users[0];
    const courses = await moodleService.core_enrol_get_users_courses(user.id);

    if (!courses || courses.length === 0) {
      console.error("User is not enrolled in any courses");
      await suspendUserIfNotSuspended(user.id);
      return;
    }

    for (const course of courses) {
      await removeUserFromCourseAndGroups(user, course.id);
    }

    await suspendUserIfNotSuspended(user.id);
  } catch (error) {
    console.error("Error in unenrolUser process:", error);
  }
}

async function removeUserFromCourseAndGroups(user, courseId) {
  try {
    await removeGroup(courseId, user.id);
    await moodleService.enrol_manual_unenrol_users([
      { userid: user.id, courseid: courseId },
    ]);
    console.log(`User unregistered from course ID: ${courseId}`);
  } catch (error) {
    console.error(`Failed to unenrol user from course ID: ${courseId}`, error);
  }
}

async function suspendUserIfNotSuspended(userId) {
  const suspendedAccount = await moodleService.suspendUser(userId);
  if (suspendedAccount.warnings.length === 0) {
    console.log("Suspended account for user ID:", userId);
  } else {
    console.error("User not suspended");
  }
}
