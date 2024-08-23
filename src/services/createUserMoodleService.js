import MoodleService from '../utils/https.js';
import UserRegistration from '../dtos/createUser.dto.js';
import {v4 as uuidv4} from 'uuid';
import { User } from '../models/UserModel.js';
import crypto from 'crypto'
import { Enrollment } from '../models/enrollmentModel.js';
import { Role } from '../models/roleModel.js';
import { Course } from '../models/courseModel.js';

const moodleService = new MoodleService();

function generateSecurePassword(length = 8) {
    return crypto.randomBytes(length)
                 .toString('base64')  // Convertir a base64 para obtener caracteres legibles
                 .slice(0, length);  // Asegurar la longitud correcta
}

export default async function createUser(req) {
    try {
        const securePassword = generateSecurePassword(12);
        let myuuid = uuidv4();


        console.log(req.body.teaching.username);

        const userDto = {
            username: req.body.teaching.username,
            password: securePassword,
            firstname: req.body.teaching.firstname,
            lastname: req.body.teaching.lastname,
            email: req.body.teaching.email,
            city: req.body.teaching.city,
            country: req.body.teaching.country,
            lang: req.body.teaching.lang,
            timezone: req.body.teaching.timezone,
            idnumber: myuuid,
            state: req.body.teaching.state
        };

        const newUserRegistration = new UserRegistration(userDto);
        newUserRegistration.validate();
        await moodleService.core_user_create_users([newUserRegistration]);

        let user = await User.findOrCreate({
            where: { username: userDto.username },
            defaults: userDto
        });

        if (!user[1]) { // Si el usuario ya existía, actualizarlo
            await user[0].update(userDto);
        }

        console.log("User processed:", { username: req.body.teaching.username, password: securePassword });

        // Procesar cada inscripción si hay enrollments

        console.log(req.body.enrollments.length);
        if (req.body.enrollments && req.body.enrollments.length > 0) {
            for (const enrollments of req.body.enrollments) {

                await Course.findOrCreate({ where: { shortname: enrollments.shortname_course } });
                await Role.findOrCreate({ where: { shortname: enrollments.shortname_role } });

                const course = await Course.findOne({ where: { shortname: enrollments.shortname_course } });
                const role = await Role.findOne({ where: { shortname: enrollments.shortname_role } });
                if (course && role) {
                    await Enrollment.findOrCreate({ where:{
                        userId: user[0].id,
                        courseId: course.id,
                        roleId: role.id,
                        program: enrollments.program
                    }});
                    console.log(`Enrollment created for user: ${user[0].id} in course: ${course.id} with role: ${role.id}`);
                }
            }
        }

        return { username: req.body.teaching.username, password: securePassword };
    } catch (error) {
        console.error("Error in createUser:", error);
        throw error;  // Re-throw para manejar más arriba si es necesario
    }
}
