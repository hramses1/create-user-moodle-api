import { Router } from 'express';
import getRoles from '../../services/getRolesMoodleService.js';
import getenrols from '../../services/getEnrolMoodleService.js'
import getUser from '../../services/getUserMoodleService.js'
const getRolesPort = Router();

getRolesPort.post('/roles', async (req, res) => {
    try {

        const resultenrol = await getenrols(req)
        const result = await getRoles(req);
        let roleid 
        res.status(200).json({ success: true, data: 'Fine' });

        const courseid = resultenrol.courses[0].id;
        result.forEach(result => {
            if (result.shortname === req.body.shortname_rol){
                roleid = result.id;
            }
        });

        const resultuser = await getUser(req)

        const userid = resultuser[0].id;



        console.log( courseid , roleid , userid );

    } catch (error) {
        console.error('Error:', error);
        if (!res.headersSent) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
});

export default getRolesPort;
