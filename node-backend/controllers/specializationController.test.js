const specializationController = require('../controllers/specializationController'); // Import instance
const SpecializationService = require('../services/specializationService');
const httpMocks = require('node-mocks-http');

jest.mock('../services/specializationService');

describe('SpecializationController', () => {
    let req, res;

    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        jest.clearAllMocks();
    });

    describe('getAllSpecializations', () => {
        it('should return a list of specializations with status 200', async () => {
            const mockSpecializations = { total: 2, page: 1, totalPages: 1, data: [{ name: 'Peanut' }, { name: 'Shellfish' }] };
            SpecializationService.prototype.getAllSpecializations.mockResolvedValue(mockSpecializations);

            req.query = { page: 1, limit: 10 };
            await specializationController.getAllSpecializations(req, res);

            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toEqual(mockSpecializations);
            expect(SpecializationService.prototype.getAllSpecializations).toHaveBeenCalledWith(1, 10);
        });

        it('should handle errors and return status 500', async () => {
            SpecializationService.prototype.getAllSpecializations.mockRejectedValue(new Error('Database error'));

            await specializationController.getAllSpecializations(req, res);

            expect(res.statusCode).toBe(500);
            expect(res._getJSONData()).toEqual({ message: 'Error fetching specializations', error: 'Database error' });
        });
    });

    describe('getSpecializationByName', () => {
        it('should return an specialization with status 200', async () => {
            const mockSpecialization = { name: 'Peanut', description: 'Severe reaction' };
            SpecializationService.prototype.getSpecializationByName.mockResolvedValue(mockSpecialization);

            req.params = { name: 'Peanut' };
            await specializationController.getSpecializationByName(req, res);

            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toEqual(mockSpecialization);
            expect(SpecializationService.prototype.getSpecializationByName).toHaveBeenCalledWith('Peanut');
        });

        it('should handle errors and return status 404', async () => {
            SpecializationService.prototype.getSpecializationByName.mockRejectedValue(new Error('Specialization not found'));

            req.params = { name: 'Unknown' };
            await specializationController.getSpecializationByName(req, res);

            expect(res.statusCode).toBe(404);
            expect(res._getJSONData()).toEqual({ message: 'Specialization not found' });
        });
    });

    describe('createSpecialization', () => {
        it('should create an specialization and return it with status 201', async () => {
            const mockSpecialization = { name: 'Pollen', description: 'Seasonal specialization' };
            SpecializationService.prototype.createSpecialization.mockResolvedValue(mockSpecialization);

            req.body = mockSpecialization;
            await specializationController.createSpecialization(req, res);

            expect(res.statusCode).toBe(201);
            expect(res._getJSONData()).toEqual(mockSpecialization);
            expect(SpecializationService.prototype.createSpecialization).toHaveBeenCalledWith(expect.any(Object));
        });

        it('should handle errors and return status 500', async () => {
            SpecializationService.prototype.createSpecialization.mockRejectedValue(new Error('Error creating specialization'));

            req.body = { name: 'Pollen', description: 'Seasonal specialization' };
            await specializationController.createSpecialization(req, res);

            expect(res.statusCode).toBe(500);
            expect(res._getJSONData()).toEqual({ message: 'Error creating specialization', error: 'Error creating specialization' });
        });
    });

    describe('updateSpecialization', () => {
        it('should update an specialization and return it with status 200', async () => {
            const mockUpdatedSpecialization = { name: 'Dust', description: 'Common indoor specialization' };
            SpecializationService.prototype.updateSpecialization.mockResolvedValue(mockUpdatedSpecialization);

            req.params = { domainId: '123' };
            req.body = mockUpdatedSpecialization;
            await specializationController.updateSpecialization(req, res);

            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toEqual(mockUpdatedSpecialization);
            expect(SpecializationService.prototype.updateSpecialization).toHaveBeenCalledWith('123', expect.any(Object));
        });

        it('should handle errors and return status 500', async () => {
            SpecializationService.prototype.updateSpecialization.mockRejectedValue(new Error('Error updating specialization'));

            req.params = { domainId: '123' };
            req.body = { name: 'Dust', description: 'Common indoor specialization' };
            await specializationController.updateSpecialization(req, res);

            expect(res.statusCode).toBe(500);
            expect(res._getJSONData()).toEqual({ message: 'Error updating specialization', error: 'Error updating specialization' });
        });

        it('should return 400 if domainId is missing', async () => {
            req.params = {}; // No domainId
            req.body = { name: 'Dust', description: 'Common indoor specialization' };
            await specializationController.updateSpecialization(req, res);

            expect(res.statusCode).toBe(400);
            expect(res._getJSONData()).toEqual({ message: 'DomainId is required' });
        });
    });

    describe('softDeleteSpecialization', () => {
        it('should soft delete an specialization and return it with status 200', async () => {
            const mockDeletedSpecialization = { name: 'Pet dander', description: 'Specialization to pets', deleted: true };
            SpecializationService.prototype.softDeleteSpecialization.mockResolvedValue(mockDeletedSpecialization);

            req.params = { domainId: '123' };
            await specializationController.softDeleteSpecialization(req, res);

            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toEqual(mockDeletedSpecialization);
            expect(SpecializationService.prototype.softDeleteSpecialization).toHaveBeenCalledWith('123');
        });

        it('should handle errors and return status 500', async () => {
            SpecializationService.prototype.softDeleteSpecialization.mockRejectedValue(new Error('Error soft deleting specialization'));

            req.params = { domainId: '123' };
            await specializationController.softDeleteSpecialization(req, res);

            expect(res.statusCode).toBe(500);
            expect(res._getJSONData()).toEqual({ message: 'Error soft deleting specialization', error: 'Error soft deleting specialization' });
        });

        it('should return 400 if domainId is missing', async () => {
            req.params = {}; // No domainId
            await specializationController.softDeleteSpecialization(req, res);

            expect(res.statusCode).toBe(400);
            expect(res._getJSONData()).toEqual({ message: 'DomainId is required' });
        });
    });
});
