const MedicalCondition = require('../persistence/schemas/medicalConditionSchema');
const MedicalConditionMapper = require('../mappers/medicalConditionMapper');

class MedicalConditionService {
    async getAllMedicalConditions(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const medicalConditions = await MedicalCondition.find({ deleted: false }).skip(skip).limit(parseInt(limit));
        const total = await MedicalCondition.countDocuments({ deleted: false });

        return {
            total,
            page: parseInt(page),
            totalPages: Math.ceil(total / limit),
            data: MedicalConditionMapper.toDTOs(medicalConditions),
        };
    }

    async getMedicalConditionByName(name) {
        const medicalCondition = await MedicalCondition.findOne({ name, deleted: false });
        if (!medicalCondition) throw new Error('Medical condition not found');
        return MedicalConditionMapper.toDTO(medicalCondition);
    }    

    async getMedicalConditionByDomainId(domainId) {
        const medicalCondition = await MedicalCondition.findOne({ domainId, deleted: false });
        if (!medicalCondition) throw new Error('Medical condition not found');
        return MedicalConditionMapper.toDTO(medicalCondition);
    }

    async createMedicalCondition(data) {
        const { name, description } = data;
        const newMedicalCondition = new MedicalCondition({ name, description });
        await newMedicalCondition.save();
        return MedicalConditionMapper.toDTO(newMedicalCondition);
    }

    async updateMedicalCondition(domainId, data) {
        console.log('Updating medical condition with domainId:', domainId); // Log the domainId
        const medicalCondition = await MedicalCondition.findOne({ domainId, deleted: false });
        P
        if (!medicalCondition) {
            console.error('Medical condition not found for domainId:', domainId);
            throw new Error('Medical condition not found');
        }
    
        console.log('Found medical condition:', medicalCondition); // Log the found medical condition
    
        medicalCondition.name = data.name || medicalCondition.name;
        medicalCondition.description = data.description || medicalCondition.description;
        await medicalCondition.save();
    
        return MedicalConditionMapper.toDTO(medicalCondition);
    }
    

    async softDeleteMedicalCondition(domainId) {
        console.log('Attempting to soft delete medical condition with domainId:', domainId); // Debug log
    
        const medicalCondition = await MedicalCondition.findOne({ domainId, deleted: false });
        if (!medicalCondition) {
            console.error('Medical condition not found for domainId:', domainId);
            throw new Error('Medical condition not found');
        }
    
        medicalCondition.deleted = true; // Perform soft delete
        await medicalCondition.save();
    
        return MedicalConditionMapper.toDTO(medicalCondition);
    }
    
}

module.exports = MedicalConditionService;
