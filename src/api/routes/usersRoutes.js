import Router from 'express';
import createUser from '../../services/createUserMoodleService.js';



const app = Router()

app.post('/create', (req, res) => {
    try {
        createUser(req, res);
    } catch (error) {
        // Asegúrate de que no se haya enviado una respuesta antes de intentar enviar una por error
        if (!res.headersSent) {
            res.status(500).send({ error: "An error occurred" });
        }
    }
});


export default app
