const Specialization = require('../persistence/schemas/specializationSchema');
const SpecializationMapper = require('../mappers/specializationMapper');

class SpecializationService {
    async getAllSpecializations(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const specializations = await Specialization.find({ deleted: false }).skip(skip).limit(parseInt(limit));
        const total = await Specialization.countDocuments({ deleted: false });

        return {
            total,
            page: parseInt(page),
            totalPages: Math.ceil(total / limit),
            data: SpecializationMapper.toDTOs(specializations),
        };
    }

    async getSpecializationByName(name) {
        const specialization = await Specialization.findOne({ name, deleted: false });
        if (!specialization) throw new Error('Specialization not found');
        return SpecializationMapper.toDTO(specialization);
    }    

    async getSpecializationByDomainId(domainId) {
        const specialization = await Specialization.findOne({ domainId, deleted: false });
        if (!specialization) throw new Error('Specialization not found');
        return SpecializationMapper.toDTO(specialization);
    }

    async createSpecialization(data) {
        const { name, description } = data;
        const newSpecialization = new Specialization({ name, description });
        await newSpecialization.save();
        return SpecializationMapper.toDTO(newSpecialization);
    }

    async updateSpecialization(domainId, data) {
        console.log('Updating specialization with domainId:', domainId); // Log the domainId
        const specialization = await Specialization.findOne({ domainId, deleted: false });
        
        if (!specialization) {
            console.error('Specialization not found for domainId:', domainId);
            throw new Error('Specialization not found');
        }
    
        console.log('Found specialization:', specialization); // Log the found specialization
    
        specialization.name = data.name || specialization.name;
        specialization.description = data.description || specialization.description;
        await specialization.save();
    
        return SpecializationMapper.toDTO(specialization);
    }
    

    async softDeleteSpecialization(domainId) {
        console.log('Attempting to soft delete specialization with domainId:', domainId); // Debug log
    
        const specialization = await Specialization.findOne({ domainId, deleted: false });
        if (!specialization) {
            console.error('Specialization not found for domainId:', domainId);
            throw new Error('Specialization not found');
        }
    
        specialization.deleted = true; // Perform soft delete
        await specialization.save();
    
        return SpecializationMapper.toDTO(specialization);
    }
    
}

module.exports = SpecializationService;
