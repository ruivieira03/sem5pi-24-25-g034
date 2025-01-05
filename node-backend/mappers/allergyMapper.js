class AllergyMapper {
    static toDTO(allergy) {
        return {
            domainId: allergy.domainId,
            name: allergy.name,
            description: allergy.description,
            deleted: allergy.deleted,
            createdAt: allergy.createdAt,
            updatedAt: allergy.updatedAt,
        };
    }

    static toDTOs(allergies) {
        return allergies.map(this.toDTO);
    }

    static toPersistence(dto) {
        return {
            domainId: dto.domainId,
            name: dto.name,
            description: dto.description,
            deleted: dto.deleted,
        };
    }
}

module.exports = AllergyMapper;
