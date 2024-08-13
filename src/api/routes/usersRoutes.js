import { Router } from 'express';
import createUsers from '../../controllers/usersController.js';

const app = Router();

app.post('/create', async (req, res) => {
    try {
        // Espera a que la función createUsers complete
        await createUsers(req, res);
    } catch (error) {
        console.error('Error handling create user route:', error);
        // Asegúrate de que no se haya enviado una respuesta antes de intentar enviar una por error
        if (!res.headersSent) {
            res.status(500).json({ error: "An error occurred" });
        }
    }
});

export default app;
