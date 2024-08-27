import MoodleService from "../utils/moodleIntegrationService.js";
import UserRegistration from "../dtos/createUser.dto.js";
import { User } from "../models/userModel.js";
import { Enrollment } from "../models/enrollmentModel.js";
import { Role } from "../models/roleModel.js";
import { Course } from "../models/courseModel.js";
import generateSecurePassword from "../utils/generateSecurePassword.js";
import { v4 as uuidv4 } from "uuid";
import formattedFirstname from "../utils/capitalizeFirstLetter.js";
import UserRegistrationDB from "../dtos/userDB.dto.js";
const moodleService = new MoodleService();

export default async function createUser(req) {
  try {
    const securePassword = generateSecurePassword(12);
    const myuuid = uuidv4();

    const Userdto = {
      username: req.body.teaching.username.toLowerCase(),
      password: securePassword,
      firstname: formattedFirstname(req.body.teaching.firstname),
      lastname: formattedFirstname(req.body.teaching.lastname),
      email: req.body.teaching.email,
      city: formattedFirstname(req.body.teaching.city),
      auth: req.body.teaching.auth,
      country: req.body.teaching.country.toLowerCase(),
      lang: req.body.teaching.lang.toLowerCase(),
      timezone: req.body.teaching.timezone,
      idnumber: myuuid,
    };

    const newUserRegistration = new UserRegistration(Userdto);
    newUserRegistration.validate();
    await moodleService.core_user_create_users([newUserRegistration]);

    const newUserRegistgrationDB = new UserRegistrationDB(Userdto)

    console.log(newUserRegistgrationDB);

    let user = await User.findOrCreate({
      where: { username: newUserRegistgrationDB.username },
      defaults: newUserRegistgrationDB,
    });

    if (!user[1]) {
      // Si el usuario ya existía, actualizarlo
      await user[0].update(newUserRegistgrationDB);
    }

    console.log("User processed:", {
      username: newUserRegistgrationDB.username,
      password: newUserRegistgrationDB.password,
    });

    // Procesar cada inscripción si hay enrollments
    if (req.body.enrollments && req.body.enrollments.length > 0) {
      for (const enrollments of req.body.enrollments) {
        await Course.findOrCreate({
          where: { shortname: enrollments.shortname_course },
        });
        await Role.findOrCreate({
          where: { shortname: enrollments.shortname_role },
        });

        const course = await Course.findOne({
          where: { shortname: enrollments.shortname_course },
        });
        const role = await Role.findOne({
          where: { shortname: enrollments.shortname_role },
        });
        if (course && role) {
          await Enrollment.findOrCreate({
            where: {
              userId: user[0].id,
              courseId: course.id,
              roleId: role.id,
              program: enrollments.program,
            },
          });
          console.log(
            `Enrollment created for user: ${user[0].id} in course: ${course.id} with role: ${role.id}`
          );
        }
      }
    }

    return {
      username: newUserRegistgrationDB.username,
      password: newUserRegistration.password,
    };
  } catch (error) {
    console.error("Error in createUser:", error);
    throw error; // Re-throw para manejar más arriba si es necesario
  }
}
