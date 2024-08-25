import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize-config.js';
import { Organization } from './organizationModel.js'; // Asegúrate de que el import es correcto
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

        // Inicialización de datos para la organización
        await initializeOrganization();
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

async function initializeOrganization() {
    try {
        const [organization, created] = await Organization.findOrCreate({
            where: { id: 1 },
            defaults: {
                name: "Formación Interna",
                abbreviation: "FI",
                degree_abbreviation: "FI",
                origin: "https://betacampus.funiber.org",
                rest_path: "/webservice/rest/server.php",
                token: "60c4fc12379b4eb32df36fa2536ad032",
                modality: "virtual",
                additional_data: JSON.stringify({"config_env": {"role_student": {"shortname": "student", "context_id": "1", "context_level": "system"}, "name_groupings": "Automatically created groups", "uuid_groupings": "f0ba1967-aa84-4f4a-8daa-560d81a1c8d0", "groupings_default": [{"name": "Language", "description": "", "abbreviation": "lang"}, {"name": "Organization", "description": "", "abbreviation": "org"}, {"name": "Term", "description": "", "abbreviation": "term"}, {"name": "Program", "description": "", "abbreviation": "program"}], "route_delete_group": "/group/delete.php?courseid=_COURSE_ID&groups=_GROUP_ID", "separator_id_number": "||", "description_groupings": "Externally Created Groups", "condition_for_registration": {"active": true, "programs": ["FI002", "FIDD224", "FICFCA", "FICFCI", "FICBCV"], "incription": {"started_at": "2024-01-01T00:00:00.000Z"}}}}),
                translations: JSON.stringify({"en_US": "Internal Training", "fr_FR": "Formation interne", "it_IT": "Formazione interna", "pt_BR": "Treinamento interno", "pt_PT": "Treinamento interno", "zh_CN": "内部培训"}),
                parent: null,
                importance: null,
                available: true,
            }
        });
    } catch (error) {
        console.error('Failed to initialize organization data:', error);
    }
}
