const SpecializationService = require('../services/specializationService');
const SpecializationDTO = require('../dtos/specializationDTO');

class SpecializationController {
    constructor() {
        this.specializationService = new SpecializationService();
        
        // Bind all methods to ensure the correct `this` context
        this.getAllSpecializations = this.getAllSpecializations.bind(this);
        this.getSpecializationByName = this.getSpecializationByName.bind(this);
        this.createSpecialization = this.createSpecialization.bind(this);
        this.updateSpecialization = this.updateSpecialization.bind(this);
        this.softDeleteSpecialization = this.softDeleteSpecialization.bind(this);
    }

    async getAllSpecializations(req, res) {
        console.log('getAllSpecializations method called.');
        try {
            const { page, limit } = req.query;
            const specializations = await this.specializationService.getAllSpecializations(page, limit);
            return res.status(200).json(specializations);
        } catch (error) {
            console.error('Error fetching specializations:', error);
            return res.status(500).json({ message: 'Error fetching specializations', error: error.message });
        }
    }

    async getSpecializationByName(req, res) {
        console.log('getSpecializationByName method called.');
        try {
            const { name } = req.params;
            const specialization = await this.specializationService.getSpecializationByName(name);
            return res.status(200).json(specialization);
        } catch (error) {
            console.error('Error fetching specialization by name:', error);
            return res.status(404).json({ message: error.message });
        }
    }

    async createSpecialization(req, res) {
        try {
            const specializationData = new SpecializationDTO(req.body);
            const createdSpecialization = await this.specializationService.createSpecialization(specializationData);
            return res.status(201).json(createdSpecialization);
        } catch (error) {
            console.error('Error creating specialization:', error);
            return res.status(500).json({ message: 'Error creating specialization', error: error.message });
        }
    }

    async updateSpecialization(req, res) {
        try {
            const { domainId } = req.params;
            console.log('Updating specialization with domainId:', domainId); // Debug log
    
            if (!domainId) {
                console.error('No domainId provided');
                return res.status(400).json({ message: 'DomainId is required' });
            }
    
            const specializationData = new SpecializationDTO(req.body);
            const updatedSpecialization = await this.specializationService.updateSpecialization(domainId, specializationData);
            return res.status(200).json(updatedSpecialization);
        } catch (error) {
            console.error('Error updating specialization:', error.message);
            return res.status(500).json({
                message: 'Error updating specialization',
                error: error.message || 'Unknown error occurred',
            });
        }
    }
    

    async softDeleteSpecialization(req, res) {
        try {
            const { domainId } = req.params;
            console.log('Soft deleting specialization with domainId:', domainId); // Debug log
    
            if (!domainId) {
                console.error('No domainId provided');
                return res.status(400).json({ message: 'DomainId is required' });
            }
    
            const deletedSpecialization = await this.specializationService.softDeleteSpecialization(domainId);
            return res.status(200).json(deletedSpecialization);
        } catch (error) {
            console.error('Error soft deleting specialization:', error.message);
            return res.status(500).json({
                message: 'Error soft deleting specialization',
                error: error.message || 'Unknown error occurred',
            });
        }
    }
    
}

module.exports = new SpecializationController();
