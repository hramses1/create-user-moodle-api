import MoodleService from '../utils/https.js';
import getEnrol from '../dtos/getEnrol.dto.js'


const moodleService = new MoodleService();

export default async function getenrols(req, res) {
    const result = await moodleService.core_course_get_courses_by_field(req.shortname_course)
    return result


}
