import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize-config.js';
// Asegúrate de importar todos los modelos
import { Organization } from './organizationModel.js'; // Ejemplo de otro modelo
import { Role } from './RoleModel.js';
import { Course } from './CourseModel.js';
import { Enrollment } from './EnrollmentModel.js';
import { User } from './UserModel.js';



export async function initDatabase() {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');

      const models = [User, Role, Course, Enrollment, Organization];
      for (const model of models) {
        try {
          await model.sync({ force: false });
          console.log(`${model.name} table has been synchronized successfully.`);
        } catch (error) {
          console.error(`Error syncing ${model.name} model:`, error);
        }
      }
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
}