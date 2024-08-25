import getEnrols from "../services/getEnrolMoodleService.js";
import getUser from "../services/getUserMoodleService.js";
import createUser from "../services/createUserMoodleService.js";
import { getGroup } from "../services/getGroupMoodleService.js";
import addGroups from "../services/addGroupService.js";
import enrolUser from "../services/enrolUserMoodleService.js";
import updateUser from "../services/updateUserMoodleService.js";
import parseUserData from "../services/parserDataService.js";
import unenrolUser from "../services/unenrolUserMoodleService.js";
export default async function enrolUsers(req, res) {
  try {
    const teaching = parseUserData(req.body.teaching);
    if (!teaching) {
      return res
        .status(400)
        .json({ message: "Teaching information is required." });
    }

    if (!teaching.username) {
      return res
        .status(400)
        .json({ message: "Username is required in the teaching object." });
    }

    if (!teaching.state) {
      return await unenrolUser(teaching);
    }

    let user = await manageUser(req);
    console.log("User processed, ID:", user.id);

    if (req.body.enrollments.length === 0) {
      console.log("No enrollments provided.");
      return {
        status: "Update Successful",
        message: "No courses to enroll. User updated successfully.",
      };
    }
    for (const enrollment of req.body.enrollments) {
      await processEnrollment(user.id, enrollment, teaching.lang);
    }

    return {
      status: "Success",
      message: "Enrollment process completed.",
    };
  } catch (error) {
    console.error("Error during enrollment operation:", error);
    return res
      .status(500)
      .json({ error: "Internal server error during the enrollment process." });
  }
}

async function manageUser(teaching) {
  const parserTeachers = parseUserData(teaching.body.teaching);
  let user = await getUser(parserTeachers.username);
  if (!user) {
    console.log("User not found, creating new user.");
    user = await createUser(teaching);
  } else {
    console.log("Updating existing user.");
    user = await updateUser(parserTeachers);
  }
  return await getUser(parserTeachers.username);
}

async function processEnrollment(userId, enrollment, lang) {
  const responseEnrolUser = await enrolUser(enrollment, userId);
  if (responseEnrolUser) {
    const enrolmentResults = await getEnrols(enrollment);
    const courseid = enrolmentResults.courses[0].id;
    await handleGroupAssignment(userId, courseid, lang, enrollment.program);
  }
}

async function handleGroupAssignment(userId, courseid, lang, program) {
  const groups = await getGroup(courseid);
  const group = groups.find((g) => g.name === `lang.${lang}`);
  const programGroup = groups.find(
    (g) => g.name === `program.${program.toLowerCase()}`
  );

  if (group) {
    await addGroups({ userid: userId, groupid: group.id });
    console.log(`User ${userId} added to language group ${group.name}.`);
  } else {
    console.error(`User ${userId} not added to program group ${lang}.`);
  }

  if (programGroup) {
    await addGroups({ userid: userId, groupid: programGroup.id });
    console.log(`User ${userId} added to program group ${programGroup.name}.`);
  } else {
    console.error(`User ${userId} not added to program group ${program}.`);
  }
}
