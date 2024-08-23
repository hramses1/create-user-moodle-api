import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize-config.js';
// Asegúrate de importar todos los modelos
import { Organization } from './organizationModel.js'; // Ejemplo de otro modelo
import { User } from './UserModel.js';
import { Role } from './roleModel.js';
import { Enrollment } from './enrollmentModel.js';
import { Course } from './courseModel.js';



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