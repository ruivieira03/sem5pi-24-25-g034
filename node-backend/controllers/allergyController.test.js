const allergyController = require('../controllers/allergyController'); // Import instance
const AllergyService = require('../services/allergyService');
const httpMocks = require('node-mocks-http');

jest.mock('../services/allergyService');

describe('AllergyController', () => {
    let req, res;

    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        jest.clearAllMocks();
    });

    describe('getAllAllergies', () => {
        it('should return a list of allergies with status 200', async () => {
            const mockAllergies = { total: 2, page: 1, totalPages: 1, data: [{ name: 'Peanut' }, { name: 'Shellfish' }] };
            AllergyService.prototype.getAllAllergies.mockResolvedValue(mockAllergies);

            req.query = { page: 1, limit: 10 };
            await allergyController.getAllAllergies(req, res);

            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toEqual(mockAllergies);
            expect(AllergyService.prototype.getAllAllergies).toHaveBeenCalledWith(1, 10);
        });

        it('should handle errors and return status 500', async () => {
            AllergyService.prototype.getAllAllergies.mockRejectedValue(new Error('Database error'));

            await allergyController.getAllAllergies(req, res);

            expect(res.statusCode).toBe(500);
            expect(res._getJSONData()).toEqual({ message: 'Error fetching allergies', error: 'Database error' });
        });
    });

    describe('getAllergyByName', () => {
        it('should return an allergy with status 200', async () => {
            const mockAllergy = { name: 'Peanut', description: 'Severe reaction' };
            AllergyService.prototype.getAllergyByName.mockResolvedValue(mockAllergy);

            req.params = { name: 'Peanut' };
            await allergyController.getAllergyByName(req, res);

            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toEqual(mockAllergy);
            expect(AllergyService.prototype.getAllergyByName).toHaveBeenCalledWith('Peanut');
        });

        it('should handle errors and return status 404', async () => {
            AllergyService.prototype.getAllergyByName.mockRejectedValue(new Error('Allergy not found'));

            req.params = { name: 'Unknown' };
            await allergyController.getAllergyByName(req, res);

            expect(res.statusCode).toBe(404);
            expect(res._getJSONData()).toEqual({ message: 'Allergy not found' });
        });
    });

    describe('createAllergy', () => {
        it('should create an allergy and return it with status 201', async () => {
            const mockAllergy = { name: 'Pollen', description: 'Seasonal allergy' };
            AllergyService.prototype.createAllergy.mockResolvedValue(mockAllergy);

            req.body = mockAllergy;
            await allergyController.createAllergy(req, res);

            expect(res.statusCode).toBe(201);
            expect(res._getJSONData()).toEqual(mockAllergy);
            expect(AllergyService.prototype.createAllergy).toHaveBeenCalledWith(expect.any(Object));
        });

        it('should handle errors and return status 500', async () => {
            AllergyService.prototype.createAllergy.mockRejectedValue(new Error('Error creating allergy'));

            req.body = { name: 'Pollen', description: 'Seasonal allergy' };
            await allergyController.createAllergy(req, res);

            expect(res.statusCode).toBe(500);
            expect(res._getJSONData()).toEqual({ message: 'Error creating allergy', error: 'Error creating allergy' });
        });
    });

    describe('updateAllergy', () => {
        it('should update an allergy and return it with status 200', async () => {
            const mockUpdatedAllergy = { name: 'Dust', description: 'Common indoor allergy' };
            AllergyService.prototype.updateAllergy.mockResolvedValue(mockUpdatedAllergy);

            req.params = { domainId: '123' };
            req.body = mockUpdatedAllergy;
            await allergyController.updateAllergy(req, res);

            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toEqual(mockUpdatedAllergy);
            expect(AllergyService.prototype.updateAllergy).toHaveBeenCalledWith('123', expect.any(Object));
        });

        it('should handle errors and return status 500', async () => {
            AllergyService.prototype.updateAllergy.mockRejectedValue(new Error('Error updating allergy'));

            req.params = { domainId: '123' };
            req.body = { name: 'Dust', description: 'Common indoor allergy' };
            await allergyController.updateAllergy(req, res);

            expect(res.statusCode).toBe(500);
            expect(res._getJSONData()).toEqual({ message: 'Error updating allergy', error: 'Error updating allergy' });
        });

        it('should return 400 if domainId is missing', async () => {
            req.params = {}; // No domainId
            req.body = { name: 'Dust', description: 'Common indoor allergy' };
            await allergyController.updateAllergy(req, res);

            expect(res.statusCode).toBe(400);
            expect(res._getJSONData()).toEqual({ message: 'DomainId is required' });
        });
    });

    describe('softDeleteAllergy', () => {
        it('should soft delete an allergy and return it with status 200', async () => {
            const mockDeletedAllergy = { name: 'Pet dander', description: 'Allergy to pets', deleted: true };
            AllergyService.prototype.softDeleteAllergy.mockResolvedValue(mockDeletedAllergy);

            req.params = { domainId: '123' };
            await allergyController.softDeleteAllergy(req, res);

            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toEqual(mockDeletedAllergy);
            expect(AllergyService.prototype.softDeleteAllergy).toHaveBeenCalledWith('123');
        });

        it('should handle errors and return status 500', async () => {
            AllergyService.prototype.softDeleteAllergy.mockRejectedValue(new Error('Error soft deleting allergy'));

            req.params = { domainId: '123' };
            await allergyController.softDeleteAllergy(req, res);

            expect(res.statusCode).toBe(500);
            expect(res._getJSONData()).toEqual({ message: 'Error soft deleting allergy', error: 'Error soft deleting allergy' });
        });

        it('should return 400 if domainId is missing', async () => {
            req.params = {}; // No domainId
            await allergyController.softDeleteAllergy(req, res);

            expect(res.statusCode).toBe(400);
            expect(res._getJSONData()).toEqual({ message: 'DomainId is required' });
        });
    });
});
