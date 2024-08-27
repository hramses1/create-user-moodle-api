import MoodleService from "../utils/moodleIntegrationService.js";
import UserEnRol from "../dtos/enrolUser.dto.js";

import getEnrols from "./getEnrolMoodleService.js";
import getRoles from "./getRolesMoodleService.js";

const moodleService = new MoodleService();

export default async function enrolUser(enrollment, userId) {
  try {
    if (!enrollment.shortname_course || !enrollment.shortname_role) {
      console.error(
        "Skipping enrollment due to missing course or role information."
      );
      return false;
    }

    const enrolmentResults = await getEnrols(enrollment);

    if (!enrolmentResults.courses.length) {
      console.error("No courses found for", enrollment.shortname_course);
      return false;
    }

    const courseid = enrolmentResults.courses[0].id;

    const roles = await getRoles();
    const role = roles.find((r) => r.shortname === enrollment.shortname_role);
    if (!role) {
      console.error("Role not found for", enrollment.shortname_role);
      return false;
    }

    const userEnRol = new UserEnRol({
      userid: userId,
      courseid: courseid,
      roleid: role.id,
    });
    userEnRol.validate();
    await moodleService.enrol_manual_enrol_users([userEnRol]);

    return `User ${userId} enrolled in course ${courseid} with role ${role.id}.`;
  } catch (error) {
    console.error("Error en los datos de entrada de enrolUser:", error);
  }
}
