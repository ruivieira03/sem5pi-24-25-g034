class MedicalConditionMapper {
    static toDTO(medicalCondition) {
        return {
            domainId: medicalCondition.domainId,
            name: medicalCondition.name,
            description: medicalCondition.description,
            deleted: medicalCondition.deleted,
            createdAt: medicalCondition.createdAt,
            updatedAt: medicalCondition.updatedAt,
        };
    }

    static toDTOs(medicalConditions) {
        return medicalConditions.map(this.toDTO);
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

module.exports = MedicalConditionMapper;
