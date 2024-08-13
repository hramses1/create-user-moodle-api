import Router from 'express';
import enrolUser from '../../services/enrolUserMoodleService.js';


const enrolPort = Router()

enrolPort.post('/enrol', (req, res) => {
    try {
        enrolUser(req, res);
    } catch (error) {
        // Asegúrate de que no se haya enviado una respuesta antes de intentar enviar una por error
        if (!res.headersSent) {
            res.status(500).send({ error: "An error occurred" });
        }
    }
});


export default enrolPort
