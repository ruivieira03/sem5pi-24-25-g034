const medicalConditionController = require('../controllers/medicalConditionController'); // Import instance
const MedicalConditionService = require('../services/medicalConditionService');
const httpMocks = require('node-mocks-http');

jest.mock('../services/medicalConditionService');

describe('MedicalConditionController', () => {
    let req, res;

    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        jest.clearAllMocks();
    });

    describe('getAllMedicalConditions', () => {
        it('should return a list of medicalConditions with status 200', async () => {
            const mockMedicalConditions = { total: 2, page: 1, totalPages: 1, data: [{ name: 'Sick' }, { name: 'Injured' }] };
            MedicalConditionService.prototype.getAllMedicalConditions.mockResolvedValue(mockMedicalConditions);

            req.query = { page: 1, limit: 10 };
            await medicalConditionController.getAllMedicalConditions(req, res);

            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toEqual(mockMedicalConditions);
            expect(MedicalConditionService.prototype.getAllMedicalConditions).toHaveBeenCalledWith(1, 10);
        });

        it('should handle errors and return status 500', async () => {
            MedicalConditionService.prototype.getAllMedicalConditions.mockRejectedValue(new Error('Database error'));

            await medicalConditionController.getAllMedicalConditions(req, res);

            expect(res.statusCode).toBe(500);
            expect(res._getJSONData()).toEqual({ message: 'Error fetching medical conditions', error: 'Database error' });
        });
    });

    describe('getMedicalConditionByName', () => {
        it('should return an medicalCondition with status 200', async () => {
            const mockMedicalCondition = { name: 'Sick', description: 'Severe reaction' };
            MedicalConditionService.prototype.getMedicalConditionByName.mockResolvedValue(mockMedicalCondition);

            req.params = { name: 'Sick' };
            await medicalConditionController.getMedicalConditionByName(req, res);

            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toEqual(mockMedicalCondition);
            expect(MedicalConditionService.prototype.getMedicalConditionByName).toHaveBeenCalledWith('Sick');
        });

        it('should handle errors and return status 404', async () => {
            MedicalConditionService.prototype.getMedicalConditionByName.mockRejectedValue(new Error('MedicalCondition not found'));

            req.params = { name: 'Unknown' };
            await medicalConditionController.getMedicalConditionByName(req, res);

            expect(res.statusCode).toBe(404);
            expect(res._getJSONData()).toEqual({ message: 'MedicalCondition not found' });
        });
    });

    describe('createMedicalCondition', () => {
        it('should create an medicalCondition and return it with status 201', async () => {
            const mockMedicalCondition = { name: 'Surgery', description: 'Seasonal medicalCondition' };
            MedicalConditionService.prototype.createMedicalCondition.mockResolvedValue(mockMedicalCondition);

            req.body = mockMedicalCondition;
            await medicalConditionController.createMedicalCondition(req, res);

            expect(res.statusCode).toBe(201);
            expect(res._getJSONData()).toEqual(mockMedicalCondition);
            expect(MedicalConditionService.prototype.createMedicalCondition).toHaveBeenCalledWith(expect.any(Object));
        });

        it('should handle errors and return status 500', async () => {
            MedicalConditionService.prototype.createMedicalCondition.mockRejectedValue(new Error('Error creating medical condition'));

            req.body = { name: 'Surgery', description: 'Seasonal medicalCondition' };
            await medicalConditionController.createMedicalCondition(req, res);

            expect(res.statusCode).toBe(500);
            expect(res._getJSONData()).toEqual({ message: 'Error creating medical condition', error: 'Error creating medical condition' });
        });
    });

    describe('updateMedicalCondition', () => {
        it('should update an medicalCondition and return it with status 200', async () => {
            const mockUpdatedMedicalCondition = { name: 'Cancer', description: 'Common indoor medicalCondition' };
            MedicalConditionService.prototype.updateMedicalCondition.mockResolvedValue(mockUpdatedMedicalCondition);

            req.params = { domainId: '123' };
            req.body = mockUpdatedMedicalCondition;
            await medicalConditionController.updateMedicalCondition(req, res);

            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toEqual(mockUpdatedMedicalCondition);
            expect(MedicalConditionService.prototype.updateMedicalCondition).toHaveBeenCalledWith('123', expect.any(Object));
        });

        it('should handle errors and return status 500', async () => {
            MedicalConditionService.prototype.updateMedicalCondition.mockRejectedValue(new Error('Error updating medical condition'));

            req.params = { domainId: '123' };
            req.body = { name: 'Cancer', description: 'Common indoor medicalCondition' };
            await medicalConditionController.updateMedicalCondition(req, res);

            expect(res.statusCode).toBe(500);
            expect(res._getJSONData()).toEqual({ message: 'Error updating medical condition', error: 'Error updating medical condition' });
        });

        it('should return 400 if domainId is missing', async () => {
            req.params = {}; // No domainId
            req.body = { name: 'Cancer', description: 'Common indoor medicalCondition' };
            await medicalConditionController.updateMedicalCondition(req, res);

            expect(res.statusCode).toBe(400);
            expect(res._getJSONData()).toEqual({ message: 'DomainId is required' });
        });
    });

    describe('softDeleteMedicalCondition', () => {
        it('should soft delete an medicalCondition and return it with status 200', async () => {
            const mockDeletedMedicalCondition = { name: 'HIV', description: 'MedicalCondition to pets', deleted: true };
            MedicalConditionService.prototype.softDeleteMedicalCondition.mockResolvedValue(mockDeletedMedicalCondition);

            req.params = { domainId: '123' };
            await medicalConditionController.softDeleteMedicalCondition(req, res);

            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toEqual(mockDeletedMedicalCondition);
            expect(MedicalConditionService.prototype.softDeleteMedicalCondition).toHaveBeenCalledWith('123');
        });

        it('should handle errors and return status 500', async () => {
            MedicalConditionService.prototype.softDeleteMedicalCondition.mockRejectedValue(new Error('Error soft deleting medical condition'));

            req.params = { domainId: '123' };
            await medicalConditionController.softDeleteMedicalCondition(req, res);

            expect(res.statusCode).toBe(500);
            expect(res._getJSONData()).toEqual({ message: 'Error soft deleting medical condition', error: 'Error soft deleting medical condition' });
        });

        it('should return 400 if domainId is missing', async () => {
            req.params = {}; // No domainId
            await medicalConditionController.softDeleteMedicalCondition(req, res);

            expect(res.statusCode).toBe(400);
            expect(res._getJSONData()).toEqual({ message: 'DomainId is required' });
        });
    });
});
