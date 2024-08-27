import MoodleService from "../utils/moodleIntegrationService.js";

const moodleService = new MoodleService();

export default async function getEnrols(req, res) {
  const result = await moodleService.core_course_get_courses_by_field(
    req.shortname_course
  );
  return result;
}
