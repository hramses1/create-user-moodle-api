import { Router } from 'express';
import getUser from '../../services/getUserMoodleService.js';
import unenrolUser from '../../services/unenrolUserMoodleService.js';
const getUserPort = Router();

getUserPort.post('/get', async (req, res) => {
    try {
        const result = await unenrolUser(req);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        console.error('Error:', error);
        if (!res.headersSent) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
});

export default getUserPort;
