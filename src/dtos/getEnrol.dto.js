export default class getEnrol {
    constructor(data) {
        this.field = data.field;
        this.value = data.value;
    }

    validate() {
        if (!this.field || !this.value) {
            throw new Error('Both field and value are required for searching a user.');
        }
    }
}