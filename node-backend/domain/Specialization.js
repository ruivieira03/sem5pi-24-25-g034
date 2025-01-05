class Specialization {
    constructor(domainId, name, description, deleted = false) {
        this.domainId = domainId;
        //Ensure name is not empty and only contains letters
        //Ensure description is not empty
        if (!name.match(/^[a-zA-Z\s]+$/)) {
            throw new Error('Invalid name');
        }
        if (description === '') {
            throw new Error('Invalid description');
        }
        this.name = name;
        this.description = description;
        this.deleted = deleted;
    }

    markAsDeleted() {
        this.deleted = true;
    }
}

export default Specialization;
