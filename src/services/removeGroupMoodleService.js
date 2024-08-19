import MoodleService from "../utils/https.js";

const moodleService = new MoodleService();

export default async function removeGroup(courseid, userId) {
  try {
    const groupsResponse = await moodleService.core_group_get_course_user_groups(courseid, userId);

    if (!groupsResponse.groups || groupsResponse.groups.length === 0) {
      console.log("No groups found for user:", userId, "in course:", courseid);
      return;
    }

    const userGroups = groupsResponse.groups.filter(group => group.id);

    for (const group of userGroups) {
      console.log("Attempting to remove user:", userId, "from group:", group.id);
      const groupId = group.id;
      const result = await moodleService.core_group_delete_group_members(groupId, userId); // Asegúrate de enviar userId como un array
      console.log("Result:", result);
    }
  } catch (error) {
    console.error("Error en los datos de entrada de removeGroup:", error);
  }
}
