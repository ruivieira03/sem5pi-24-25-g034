class SpecializationMapper {
    static toDTO(specialization) {
        return {
            domainId: specialization.domainId,
            name: specialization.name,
            description: specialization.description,
            deleted: specialization.deleted,
            createdAt: specialization.createdAt,
            updatedAt: specialization.updatedAt,
        };
    }

    static toDTOs(specializations) {
        return specializations.map(this.toDTO);
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

module.exports = SpecializationMapper;
