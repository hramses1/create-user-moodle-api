import getRoles from "../services/getRolesMoodleService.js";
import getenrols from "../services/getEnrolMoodleService.js";
import getUser from "../services/getUserMoodleService.js";
import createUsers from '../../controllers/usersController.js';

export default async function enrolUser(req, res) {
  try {

    if (!req.body.teaching || !req.body.enrollments) {
      return res.status(400).json({ message: "Falta información de enseñanza o matriculaciones." });
    }

    let resultUser = null;
    let courseid = null;
    let roleid = null;
    // Buscar usuario
    if ('username' in req.body.teaching) {
      const users = await getUser(req.body.teaching.username);
      if (!users.length) {
        return res.status(404).json({ message: "Usuario no encontrado." });
      }
      resultUser = users[0];
    } else {
      return res.status(400).json({ message: "Nombre de usuario no proporcionado." });
    }

    // Procesar matriculaciones

    for (const enrollment of req.body.enrollments) {
      if (enrollment.shortname_course && enrollment.shortname_role) {
        if (enrollment.shortname_course) {

          const enrolmentResults = await getenrols(enrollment);
          const result = await getRoles();
          courseid = enrolmentResults.courses[0].id;

          result.filter(result=> {
            if (result.shortname === enrollment.shortname_role) {
              roleid = result.id;
            }
          })
        }
      }

      const userid = resultUser.id;

      console.log(JSON.stringify({ courseid, roleid, userid })); // Aqui se hace en enrrollments
    }
    return "User Enrollment";
  } catch (error) {
    console.error("Error en la operación:", error);
  }
}
