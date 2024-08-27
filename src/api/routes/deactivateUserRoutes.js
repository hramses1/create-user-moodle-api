import { Router } from 'express';
import unenrolUsersController from '../../controllers/unenrolController.js';
const desactivateUserPort = Router();

desactivateUserPort.post('/desactivate', async (req, res) => {
    try {
        const result = await unenrolUsersController(req);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        console.error('Error:', error);
        if (!res.headersSent) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
});

export default desactivateUserPort;
