export default class UserSearch {
    constructor(data) {
        this.key = data.key;   // La clave de búsqueda, por ejemplo 'username'
        this.value = data.value; // El valor asociado a la clave de búsqueda
    }

    validate() {
        if (!this.key || !this.value) {
            throw new Error('Both key and value are required for searching a user.');
        }
        // Puedes añadir validaciones específicas dependiendo de la clave
        if (this.key === 'username' && this.value.length < 3) {
            throw new Error('Username must be at least 3 characters long.');
        }
    }
}
