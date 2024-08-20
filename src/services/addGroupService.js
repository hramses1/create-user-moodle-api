import MoodleService from '../utils/https.js';
import Group from '../dtos/group.dto.js';

const moodleService = new MoodleService();

export default async function addGroups(members) {
    try {
        const validateAddGroupUser = new Group(members);
        validateAddGroupUser.validate()
        const group  = await moodleService.core_group_add_group_members([validateAddGroupUser])
        return group
    } catch (error) {
        console.error("Error en los datos de entrada:", error);
    }
}
