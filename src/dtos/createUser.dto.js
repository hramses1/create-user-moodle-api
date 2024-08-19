export default class UserRegistration {
    constructor(data) {
        this.username = data.username;
        this.password = data.password; // Considera encriptar la contraseña antes de su almacenamiento
        this.firstname = data.firstname;
        this.lastname = data.lastname;
        this.email = data.email;
        this.city = data.city || 'Barcelona';
        this.auth = data.auth || 'manual';
        this.country = data.country || 'España';
        this.lang = data.lang || 'es'; // Establece el idioma por defecto si no se proporciona
        this.timezone = data.timezone || 'UTC'; // Establece la zona horaria por defecto si no se proporciona
        this.idnumber = data.idnumber || '';
    }

    validate() {
        if (!this.username || !this.email) {
            throw new Error('Username and email are required.');
        }
        // Puedes agregar más validaciones según sea necesario
    }
}
