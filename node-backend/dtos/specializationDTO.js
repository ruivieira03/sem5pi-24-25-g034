class SpecializationDTO {
    constructor({ domainId, name, description, deleted = false }) {
        this.domainId = domainId;
        this.name = name;
        this.description = description;
        this.deleted = deleted;
    }
}

module.exports = SpecializationDTO;