const {ValidationError} = require("../utils/errors");

class ClientRecord {
    constructor(obj) {
        const {id, name, mail, nextContactAt, notes} = obj;

        if (!id|| typeof id !== 'string')  {
            throw new ValidationError('ID can\`t be empty.');
        }

        if (!name || typeof name !== 'string' || name.length < 3)  {
            throw new ValidationError('Name must be a string and must have minimum 3 letters.');
        }

        if (!mail || typeof mail !== 'string' || mail.indexOf("@") === -1)  {
            throw new ValidationError('Wrong mail address.');
        }

        if (typeof nextContactAt !== 'string')  {
            throw new ValidationError('Next contact must be a string.');
        }

        if (typeof notes !== 'string')  {
            throw new ValidationError('Notes must be a string.');
        }

        this.id = id;
        this.name = name;
        this.mail = mail;
        this.nextContactAt = nextContactAt;
        this.notes = notes;
    }

}

module.exports = {
    ClientRecord,
}
