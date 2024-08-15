export default class addGroup {
    constructor(data) {
        this.groupid = data.groupid;
        this.userid = data.userid;
    }

    validate() {
        if (!this.groupid || !this.userid ) {
            throw new Error('Both groupid and userid are required for gruping a user.');
        }
    }
}
