import axios from 'axios';
import qs from 'qs';  // Asegúrate de tener qs instalado para codificar correctamente los parámetros

// Parámetros para obtener el token
const credentials = {
  username: 'ws.syncuser',  // Reemplaza con el nombre de usuario real
  password: 'Moodle.123',         // Reemplaza con la contraseña real
  service: 'sync-students'  // Reemplaza con el nombre corto del servicio
};

const url = 'https://betacampus.funiber.org/login/token.php';


axios.get(url, { params: credentials })
  .then(response => {
    console.log('Respuesta completa:', response.data);
    console.log('Token:', response.data.token);
  })
  .catch(error => {
    console.error('Error al obtener el token:', error.response ? error.response.data : error.message);
  });
