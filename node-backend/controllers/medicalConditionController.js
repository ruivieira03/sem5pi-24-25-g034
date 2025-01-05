const MedicalConditionService = require('../services/medicalConditionService');
const MedicalConditionDTO = require('../dtos/medicalConditionDTO');

class MedicalConditionController {
    constructor() {
        this.medicalConditionService = new MedicalConditionService();
        
        // Bind all methods to ensure the correct `this` context
        this.getAllMedicalConditions = this.getAllMedicalConditions.bind(this);
        this.getMedicalConditionByName = this.getMedicalConditionByName.bind(this);
        this.createMedicalCondition = this.createMedicalCondition.bind(this);
        this.updateMedicalCondition = this.updateMedicalCondition.bind(this);
        this.softDeleteMedicalCondition = this.softDeleteMedicalCondition.bind(this);
    }

    async getAllMedicalConditions(req, res) {
        console.log('getAllMedicalConditions method called.');
        try {
            const { page, limit } = req.query;
            const medicalConditions = await this.medicalConditionService.getAllMedicalConditions(page, limit);
            return res.status(200).json(medicalConditions);
        } catch (error) {
            console.error('Error fetching medical conditions:', error);
            return res.status(500).json({ message: 'Error fetching medical conditions', error: error.message });
        }
    }

    async getMedicalConditionByName(req, res) {
        console.log('getMedicalConditionByName method called.');
        try {
            const { name } = req.params;
            const medicalCondition = await this.medicalConditionService.getMedicalConditionByName(name);
            return res.status(200).json(medicalCondition);
        } catch (error) {
            console.error('Error fetching medical condition by name:', error);
            return res.status(404).json({ message: error.message });
        }
    }

    async createMedicalCondition(req, res) {
        try {
            const medicalConditionData = new MedicalConditionDTO(req.body);
            const createdMedicalCondition = await this.medicalConditionService.createMedicalCondition(medicalConditionData);
            return res.status(201).json(createdMedicalCondition);
        } catch (error) {
            console.error('Error creating medical condition:', error);
            return res.status(500).json({ message: 'Error creating medical condition', error: error.message });
        }
    }

    async updateMedicalCondition(req, res) {
        try {
            const { domainId } = req.params;
            console.log('Updating medical condition with domainId:', domainId); // Debug log
    
            if (!domainId) {
                console.error('No domainId provided');
                return res.status(400).json({ message: 'DomainId is required' });
            }
    
            const medicalConditionData = new MedicalConditionDTO(req.body);
            const updatedMedicalCondition = await this.medicalConditionService.updateMedicalCondition(domainId, medicalConditionData);
            return res.status(200).json(updatedMedicalCondition);
        } catch (error) {
            console.error('Error updating medical condition:', error.message);
            return res.status(500).json({
                message: 'Error updating medical condition',
                error: error.message || 'Unknown error occurred',
            });
        }
    }

    async softDeleteMedicalCondition(req, res) {
        try {
            const { domainId } = req.params;
            console.log('Soft deleting medical condition with domainId:', domainId); // Debug log
    
            if (!domainId) {
                console.error('No domainId provided');
                return res.status(400).json({ message: 'DomainId is required' });
            }
    
            const deletedMedicalCondition = await this.medicalConditionService.softDeleteMedicalCondition(domainId);
            return res.status(200).json(deletedMedicalCondition);
        } catch (error) {
            console.error('Error soft deleting medical condition:', error.message);
            return res.status(500).json({
                message: 'Error soft deleting medical condition',
                error: error.message || 'Unknown error occurred',
            });
        }
    }
}

module.exports = new MedicalConditionController();
