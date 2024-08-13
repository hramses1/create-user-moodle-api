// src/app.js
import express from 'express';
import {initDatabase} from './models/UserModel.js';  
import app  from './api/routes/usersRoutes.js'; 
import getUser from './api/routes/getUsersRoutes.js'
import enrolPort from './api/routes/enrolRoutes.js'
import getRolesPort from './api/routes/getRolesRoutes.js';


const route = express();
route.use(express.json());
route.use('/api/',app)
route.use('/api/',getUser)
route.use('/api/',enrolPort)
route.use('/api/',getRolesPort)
// Configuraciones y middleware de Express aquí

initDatabase().then(() => {
    route.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
})