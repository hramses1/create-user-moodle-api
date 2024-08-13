export default class UserEnRol {
    constructor(data) {
        this.roleid = data.roleid;
        this.userid = data.userid;
        this.courseid = data.courseid;
    }

    validate() {
        if (!this.roleid || !this.userid || !this.courseid) {
            throw new Error('Both key and userid are required for searching a user.');
        }
    }
}
