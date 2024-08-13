import { Router } from 'express';
import getRoles from '../../services/getRolesMoodleService.js';

const getRolesPort = Router();

getRolesPort.post('/roles', async (req, res) => {
    try {
        const result = await getRoles(req);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        console.error('Error:', error);
        if (!res.headersSent) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
});

export default getRolesPort;
