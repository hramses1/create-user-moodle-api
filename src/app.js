// src/app.js
import express from 'express';
import {initDatabase,User} from './models/UserModel.js';  // Importar para inicializar la base de datos
import app from './api/routes/usersRoutes.js'


const route = express();
route.use(express.json());
route.use('/api/',app)
// Configuraciones y middleware de Express aquí

initDatabase().then(() => {
    route.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
})