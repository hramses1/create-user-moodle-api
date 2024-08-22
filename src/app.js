import express from 'express';
import createUserMoodle from './api/routes/createUsersRoutes.js';
import getUser from './api/routes/getUsersRoutes.js';
import enrolPort from './api/routes/enrolRoutes.js';
import getRolesPort from './api/routes/getRolesRoutes.js';
import helmet from 'helmet';
import compression from 'compression';

import {initDatabase} from './models/initDatabase.js';  

const app = express();

// Middleware básico
app.use(helmet()); // Seguridad básica
app.use(compression()); // Compresión de las respuestas
app.use(express.json()); // Parseo de JSON

// Rutas
app.use('/api/', createUserMoodle);
app.use('/api/', getUser);
app.use('/api/', enrolPort);
app.use('/api/', getRolesPort);

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Inicialización de la base de datos y del servidor
initDatabase().then(() => {
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
}).catch(error => {
    console.error('Failed to initialize the database:', error);
});


