import MoodleService from "../utils/moodleIntegrationService.js";
import getUser from "./getUserMoodleService.js";
import removeGroup from "./removeGroupMoodleService.js";
import { User } from "../models/userModel.js";

const moodleService = new MoodleService();

export default async function unenrolUser(req) {
  try {
    const username = req.username;
    console.log(username); 
    if (!username) {
      console.error("No username provided");
      return { status: "Error", message: "No username provided" };
    }

    const users = await getUser(username);
    if (!users || users.length === 0) {
      console.error("No user found with the provided username");
      return {
        status: "Error",
        message: "No user found with the provided username",
      };
    }

    const user = users; 
    const courses = await moodleService.core_enrol_get_users_courses(user.id);

    if (!courses || courses.length === 0) {
      console.error("User is not enrolled in any courses");
      await suspendUserIfNotSuspended(user.id);
      return {
        status: "No Enrollment",
        message: "User is not enrolled in any courses.",
      };
    }

    for (const course of courses) {
      await removeUserFromCourseAndGroups(user.id, course.id);
    }

    await suspendUserIfNotSuspended(user.id);

    const userdb = await User.findOne({ where: { username } });
    if (userdb) {
      await userdb.update({ state: req.state }); 
      return {
        status: "Success",
        message:
          "The student's account has been deactivated and updated successfully.",
      };
    }
  } catch (error) {
    console.error("Error in unenrolUser process:", error);
    return {
      status: "Error",
      message: "An error occurred during the unenrolment process.",
    };
  }
}

async function removeUserFromCourseAndGroups(userId, courseId) {
  try {
    await removeGroup(courseId, userId);
    await moodleService.enrol_manual_unenrol_users([
      { userid: userId, courseid: courseId },
    ]);
    console.log(`User unregistered from course ID: ${courseId}`);
  } catch (error) {
    console.error(`Failed to unenrol user from course ID: ${courseId}`, error);
  }
}

async function suspendUserIfNotSuspended(userId) {
  try {
    const suspendedAccount = await moodleService.suspendUser(userId);
    if (
      suspendedAccount &&
      suspendedAccount.warnings &&
      suspendedAccount.warnings.length === 0
    ) {
      console.log("Suspended account for user ID:", userId);
    } else {
      console.log("User already suspended or suspension failed");
    }
  } catch (error) {
    console.error("Suspension error:", error);
  }
}
