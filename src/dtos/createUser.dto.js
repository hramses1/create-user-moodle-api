export default class UserRegistration {
    constructor(data) {
        this.username = data.username;
        this.password = data.password; // Considera encriptar la contraseña antes de su almacenamiento
        this.firstname = data.firstname;
        this.lastname = data.lastname;
        this.email = data.email;
        this.city = data.city;
        this.auth = data.auth;
        this.country = data.country;
        this.lang = data.lang || 'en'; // Establece el idioma por defecto si no se proporciona
        this.timezone = data.timezone || 'UTC'; // Establece la zona horaria por defecto si no se proporciona
        this.idnumber = data.idnumber || ''; // Establece un identificador único si es necesario
    }

    validate() {
        if (!this.username || !this.email) {
            throw new Error('Username and email are required.');
        }
        // Puedes agregar más validaciones según sea necesario
    }
}
