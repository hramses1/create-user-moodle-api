import axios from 'axios';
import qs from 'qs'; // Asegúrate de tener qs instalado para la correcta codificación

const url = 'https://betacampus.funiber.org/webservice/rest/server.php';
const token = '60c4fc12379b4eb32df36fa2536ad032'; // Usa el token obtenido

// Configurando parámetros para solicitar todos los usuarios
const params = {
    wstoken: token,
    wsfunction: 'core_user_get_users',
    moodlewsrestformat: 'json',
    criteria: [{
        key: 'username',
        value: 'cocimiic5708884'  // Usar un comodín para intentar obtener todos los usuarios
    }]
};

// Opciones para la solicitud HTTP, incluyendo las cabeceras
const options = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
};

// Realizando la solicitud POST usando axios
axios.post(url, qs.stringify(params), options)
    .then(response => {
        if (response.data && response.data.users) {
            console.log('Usuarios encontrados:', response.data.users);
        } else {
            console.log('No se encontraron usuarios:', response.data);
        }
    })
    .catch(error => {
        console.error('Error al buscar los usuarios:', error.response ? error.response.data : error.message);
    });
