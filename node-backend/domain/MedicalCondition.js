class MedicalCondition {
    constructor(domainId, name, description, deleted = false) {
        this.domainId = domainId;
        this.name = name;
        this.description = description;
        this.deleted = deleted;
    }

    markAsDeleted() {
        this.deleted = true;
    }
}

export default MedicalCondition;
