import getRoles from "../services/getRolesMoodleService.js";
import getEnrols from "../services/getEnrolMoodleService.js";
import getUser from "../services/getUserMoodleService.js";
import createUser from "../services/createUserMoodleService.js";
import { getGroup } from "../services/getGroupMoodleService.js";
import addGroups from "../services/addGroupService.js";
import enrolUser from "../services/enrolUserMoodleService.js";
import updateUser from "../services/updateUserMoodleService.js";
import { isColString } from "sequelize/lib/utils";

export default async function enrolUsers(req, res) {
  try {
    const teaching = req.body.teaching;
    if (!teaching) {
      return res.status(400).json({ message: "Teaching information is required." });
    }

    if (!teaching.username) {
      return res.status(400).json({ message: "Username is required in the teaching object." });
    }

    let user = await manageUser(req);
    console.log("User processed, ID:", user.id);
    
    if (!req.body.enrollments || req.body.enrollments.length === 0) {
      console.log("No enrollments provided.");
      return res.json({ message: "No courses to enroll. User updated successfully." });
    }

    for (const enrollment of req.body.enrollments) {
      await processEnrollment(user.id, enrollment, teaching.lang);
    }

    return { message: "Enrollment process completed successfully." };
  } catch (error) {
    console.error("Error during enrollment operation:", error);
    return res.status(500).json({ error: "Internal server error during the enrollment process." });
  }
}

async function manageUser(teaching) {
  let user = await getUser(teaching.body.teaching.username);
  if (!user) {
    console.log("User not found, creating new user.");
    user = await createUser(teaching);
  } else {
    console.log("Updating existing user.");
    user = await updateUser(teaching.body.teaching);
  }
  return await getUser(teaching.body.teaching.username);
}

async function processEnrollment(userId, enrollment, lang) {
  if (!enrollment.shortname_course || !enrollment.shortname_role) {
    console.log("Skipping enrollment due to missing course or role information.");
    return;
  }

  const enrolmentResults = await getEnrols(enrollment);
  if (!enrolmentResults.courses.length) {
    console.log("No courses found for", enrollment.shortname_course);
    return;
  }

  const courseid = enrolmentResults.courses[0].id;
  const roles = await getRoles();
  const role = roles.find(r => r.shortname === enrollment.shortname_role);
  if (!role) {
    console.log("Role not found for", enrollment.shortname_role);
    return;
  }

  await enrolUser({ userid: userId, courseid: courseid, roleid: role.id });
  console.log(`User ${userId} enrolled in course ${courseid} with role ${role.id}.`);

  await handleGroupAssignment(userId, courseid, lang, enrollment.program);
}

async function handleGroupAssignment(userId, courseid, lang, program) {
  const groups = await getGroup(courseid);
  const group = groups.find(g => g.name === `lang.${lang}`);
  const programGroup = groups.find(g => g.name === `program.${program.toLowerCase()}`);

  if (group) {
    await addGroups({ userid: userId, groupid: group.id });
    console.log(`User ${userId} added to language group ${group.id}.`);
  }

  if (programGroup) {
    await addGroups({ userid: userId, groupid: programGroup.id });
    console.log(`User ${userId} added to program group ${programGroup.id}.`);
  }
}
