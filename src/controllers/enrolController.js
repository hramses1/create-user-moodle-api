import getRoles from "../services/getRolesMoodleService.js";
import getenrols from "../services/getEnrolMoodleService.js";
import getUser from "../services/getUserMoodleService.js";
import createUser from "../services/createUserMoodleService.js";
import {getGroup} from "../services/getGroupMoodleService.js";
import addGroups from "../services/addGroupService.js";
import enrolUser from "../services/enrolUserMoodleService.js";
import UpdateUser from "../services/updateUserMoodleService.js";

export default async function enrolUsers(req, res) {
  try {
    if (!req.body.teaching || !req.body.enrollments) {
      return res
        .status(400)
        .json({ message: "Falta información de enseñanza o matriculaciones." });
    }
    let resultUser = null;
    let courseid = null;
    let roleid = null;
    let users = null;
    let lang = null;
    let idgroup = null;
    let program = null;
    let shortname_course = null;
    let userCreate = null;
    let userid = null;
    // Creacion de usuario
    if ("username" in req.body.teaching) {
      users = await getUser(req.body.teaching.username);
      if (!users.length) {
        console.log("User not found, creating new user.");
        userCreate = await createUser(req.body.teaching);
      } else {
        users = await getUser(req.body.teaching.username);
        resultUser = users[0];
        userid = resultUser.id;
        userCreate = await UpdateUser(req.body.teaching);
      }
    }
    console.log("created user.");
    // Procesar matriculaciones
    for (const enrollment of req.body.enrollments) {
      if (enrollment.shortname_course && enrollment.shortname_role) {
        if (enrollment.shortname_course) {
          const enrolmentResults = await getenrols(enrollment);
          const result = await getRoles();
          shortname_course = enrollment.shortname_course;
          program = enrollment.program;
          courseid = enrolmentResults.courses[0].id;
          result.filter((result) => {
            if (result.shortname === enrollment.shortname_role) {
              roleid = result.id;
            }
          });
        }
      }
      lang = req.body.teaching.lang;

      // Anadir Grupos
      const getGroups = await getGroup(courseid);
      getGroups.filter((result) => {
        if (result.name === `lang.${lang}`) {
          idgroup = result.id;
        }
        if (result.name === `program.${program.toLowerCase()}`) {
          program = result.id;
        }
      });
      await enrolUser({
        roleid: `${roleid}`,
        userid: `${userid}`,
        courseid: `${courseid}`,
      });
      console.log(`User enrrollments ${shortname_course}`);
      await addGroups({ groupid: `${idgroup}`, userid: `${userid}` });
      await addGroups({ groupid: `${program}`, userid: `${userid}` });
      console.log("Grouped user");
    }
    return userCreate;
  } catch (error) {
    console.error("Error en la operación:", error);
  }
}
