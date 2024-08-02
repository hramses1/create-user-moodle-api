// src/app.js
import express from 'express';
import {initDatabase} from './models/UserModel.js';  
import app  from './api/routes/usersRoutes.js'; 
import  getUserPort  from './api/routes/getUsersRoutes.js';

const route = express();
route.use(express.json());
route.use('/api/',app)
route.use('/api/',getUserPort)
// Configuraciones y middleware de Express aquí

initDatabase().then(() => {
    route.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
})