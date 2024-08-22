import { Router } from 'express';

import enrolUsers from '../../controllers/enrolController.js'
const createUserMoodle = Router();

createUserMoodle.post('/create', async (req, res) => {
    try {
        const resultenrol = await enrolUsers(req)
        res.status(200).json({ success: true, data: resultenrol});
    } catch (error) {
        console.error('Error:', error);
        if (!res.headersSent) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
});

export default createUserMoodle;
