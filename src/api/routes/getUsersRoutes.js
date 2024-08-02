import Router from 'express';
import getUser from '../../services/getUserMoodleService.js'



const getUserPort = Router()

getUserPort.post('/get', (req, res) => {
    try {
        getUser(req, res);
    } catch (error) {
        // Asegúrate de que no se haya enviado una respuesta antes de intentar enviar una por error
        if (!res.headersSent) {
            res.status(500).send({ error: "An error occurred" });
        }
    }
});


export default getUserPort
