export default class UserUpdate {
    constructor(data) {
        this.id = data.id;
        this.username = data.username;
        this.firstname = data.firstname;
        this.lastname = data.lastname;
        this.email = data.email;
        this.city = data.city || 'Barcelona';
    }

    validate() {
        if (!this.username || !this.email || !this.id) {
            throw new Error('Username, email and ID are required.');
        }
        // Puedes agregar más validaciones según sea necesario
    }
}
