const AllergyService = require('../services/allergyService');
const AllergyDTO = require('../dtos/allergyDTO');

class AllergyController {
    constructor() {
        this.allergyService = new AllergyService();
        
        // Bind all methods to ensure the correct `this` context
        this.getAllAllergies = this.getAllAllergies.bind(this);
        this.getAllergyByName = this.getAllergyByName.bind(this);
        this.createAllergy = this.createAllergy.bind(this);
        this.updateAllergy = this.updateAllergy.bind(this);
        this.softDeleteAllergy = this.softDeleteAllergy.bind(this);
    }

    async getAllAllergies(req, res) {
        console.log('getAllAllergies method called.');
        try {
            const { page, limit } = req.query;
            const allergies = await this.allergyService.getAllAllergies(page, limit);
            return res.status(200).json(allergies);
        } catch (error) {
            console.error('Error fetching allergies:', error);
            return res.status(500).json({ message: 'Error fetching allergies', error: error.message });
        }
    }

    async getAllergyByName(req, res) {
        console.log('getAllergyByName method called.');
        try {
            const { name } = req.params;
            const allergy = await this.allergyService.getAllergyByName(name);
            return res.status(200).json(allergy);
        } catch (error) {
            console.error('Error fetching allergy by name:', error);
            return res.status(404).json({ message: error.message });
        }
    }

    async createAllergy(req, res) {
        try {
            const allergyData = new AllergyDTO(req.body);
            const createdAllergy = await this.allergyService.createAllergy(allergyData);
            return res.status(201).json(createdAllergy);
        } catch (error) {
            console.error('Error creating allergy:', error);
            return res.status(500).json({ message: 'Error creating allergy', error: error.message });
        }
    }

    async updateAllergy(req, res) {
        try {
            const { domainId } = req.params;
            console.log('Updating allergy with domainId:', domainId); // Debug log
    
            if (!domainId) {
                console.error('No domainId provided');
                return res.status(400).json({ message: 'DomainId is required' });
            }
    
            const allergyData = new AllergyDTO(req.body);
            const updatedAllergy = await this.allergyService.updateAllergy(domainId, allergyData);
            return res.status(200).json(updatedAllergy);
        } catch (error) {
            console.error('Error updating allergy:', error.message);
            return res.status(500).json({
                message: 'Error updating allergy',
                error: error.message || 'Unknown error occurred',
            });
        }
    }
    

    async softDeleteAllergy(req, res) {
        try {
            const { domainId } = req.params;
            console.log('Soft deleting allergy with domainId:', domainId); // Debug log
    
            if (!domainId) {
                console.error('No domainId provided');
                return res.status(400).json({ message: 'DomainId is required' });
            }
    
            const deletedAllergy = await this.allergyService.softDeleteAllergy(domainId);
            return res.status(200).json(deletedAllergy);
        } catch (error) {
            console.error('Error soft deleting allergy:', error.message);
            return res.status(500).json({
                message: 'Error soft deleting allergy',
                error: error.message || 'Unknown error occurred',
            });
        }
    }
    
}

module.exports = new AllergyController();
