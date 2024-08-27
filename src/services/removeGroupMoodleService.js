import MoodleService from "../utils/moodleIntegrationService.js";
import Group from "../dtos/group.dto.js";
const moodleService = new MoodleService();

export default async function removeGroup(courseid, userId) {
  try {
    const groupsResponse =
      await moodleService.core_group_get_course_user_groups(courseid, userId);

    if (!groupsResponse.groups || groupsResponse.groups.length === 0) {
      console.log("No groups found for user:", userId, "in course:", courseid);
      return;
    }

    const userGroups = groupsResponse.groups.filter((group) => group.id);

    for (const group of userGroups) {
      console.log(
        "Attempting to remove user:",
        userId,
        "from group:",
        group.name
      );
      const groupId = group.id;
      const validateGroupUser = new Group({
        groupid: groupId,
        userid: userId,
      });
      validateGroupUser.validate();

      await moodleService.core_group_delete_group_members([validateGroupUser]);
      //console.log("ungrouped user from group:", group.name);
    }
  } catch (error) {
    console.error("Error en los datos de entrada de removeGroup:", error);
  }
}
