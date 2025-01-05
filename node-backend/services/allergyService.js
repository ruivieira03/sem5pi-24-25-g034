const Allergy = require('../persistence/schemas/allergySchema');
const AllergyMapper = require('../mappers/allergyMapper');

class AllergyService {
    async getAllAllergies(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const allergies = await Allergy.find({ deleted: false }).skip(skip).limit(parseInt(limit));
        const total = await Allergy.countDocuments({ deleted: false });

        return {
            total,
            page: parseInt(page),
            totalPages: Math.ceil(total / limit),
            data: AllergyMapper.toDTOs(allergies),
        };
    }

    async getAllergyByName(name) {
        const allergy = await Allergy.findOne({ name, deleted: false });
        if (!allergy) throw new Error('Allergy not found');
        return AllergyMapper.toDTO(allergy);
    }    

    async getAllergyByDomainId(domainId) {
        const allergy = await Allergy.findOne({ domainId, deleted: false });
        if (!allergy) throw new Error('Allergy not found');
        return AllergyMapper.toDTO(allergy);
    }

    async createAllergy(data) {
        const { name, description } = data;
        const newAllergy = new Allergy({ name, description });
        await newAllergy.save();
        return AllergyMapper.toDTO(newAllergy);
    }

    async updateAllergy(domainId, data) {
        console.log('Updating allergy with domainId:', domainId); // Log the domainId
        const allergy = await Allergy.findOne({ domainId, deleted: false });
        
        if (!allergy) {
            console.error('Allergy not found for domainId:', domainId);
            throw new Error('Allergy not found');
        }
    
        console.log('Found allergy:', allergy); // Log the found allergy
    
        allergy.name = data.name || allergy.name;
        allergy.description = data.description || allergy.description;
        await allergy.save();
    
        return AllergyMapper.toDTO(allergy);
    }
    

    async softDeleteAllergy(domainId) {
        console.log('Attempting to soft delete allergy with domainId:', domainId); // Debug log
    
        const allergy = await Allergy.findOne({ domainId, deleted: false });
        if (!allergy) {
            console.error('Allergy not found for domainId:', domainId);
            throw new Error('Allergy not found');
        }
    
        allergy.deleted = true; // Perform soft delete
        await allergy.save();
    
        return AllergyMapper.toDTO(allergy);
    }
    
}

module.exports = AllergyService;
