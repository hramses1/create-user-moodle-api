import { Router } from 'express';
import getRoles from '../../services/getRolesMoodleService.js';
import getenrols from '../../services/getEnrolMoodleService.js'
import getUser from '../../services/getUserMoodleService.js'

import enrolUser from '../../controllers/enrolController.js'
const getRolesPort = Router();

getRolesPort.post('/roles', async (req, res) => {
    try {

        const resultenrol = await enrolUser(req)

        res.status(200).json({ success: true, data: resultenrol});



    } catch (error) {
        console.error('Error:', error);
        if (!res.headersSent) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
});

export default getRolesPort;
