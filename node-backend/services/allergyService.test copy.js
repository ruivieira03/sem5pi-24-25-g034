const Allergy = require('../persistence/schemas/allergySchema');
const AllergyService = require('./allergyService');
const AllergyMapper = require('../mappers/allergyMapper');

jest.mock('../persistence/schemas/allergySchema');

describe('AllergyService', () => {
    let allergyService;

    beforeEach(() => {
        jest.clearAllMocks();
        allergyService = new AllergyService();
    });

    describe('getAllAllergies', () => {
        it('should return a paginated list of allergies', async () => {
            const mockAllergies = [
                { domainId: '123', name: 'Pollen', description: 'Spring allergy', deleted: false },
            ];
            Allergy.find.mockReturnValue({
                skip: jest.fn().mockReturnThis(),
                limit: jest.fn().mockResolvedValue(mockAllergies),
            });
            Allergy.countDocuments.mockResolvedValue(1);

            const result = await allergyService.getAllAllergies(1, 10);

            expect(Allergy.find).toHaveBeenCalledWith({ deleted: false });
            expect(Allergy.countDocuments).toHaveBeenCalledWith({ deleted: false });
            expect(result).toEqual({
                total: 1,
                page: 1,
                totalPages: 1,
                data: AllergyMapper.toDTOs(mockAllergies),
            });
        });
    });

    describe('getAllergyByName', () => {
        it('should return a single allergy by name', async () => {
            const mockAllergy = { domainId: '123', name: 'Pollen', description: 'Spring allergy', deleted: false };
            Allergy.findOne.mockResolvedValue(mockAllergy);

            const result = await allergyService.getAllergyByName('Pollen');

            expect(Allergy.findOne).toHaveBeenCalledWith({ name: 'Pollen', deleted: false });
            expect(result).toEqual(AllergyMapper.toDTO(mockAllergy));
        });

        it('should throw an error if allergy is not found', async () => {
            Allergy.findOne.mockResolvedValue(null);

            await expect(allergyService.getAllergyByName('Nonexistent')).rejects.toThrow('Allergy not found');
        });
    });

    describe('createAllergy', () => {
        it('should create and return a new allergy', async () => {
            const allergyData = { name: 'Dust', description: 'Dust allergy' };
            const savedAllergy = {
                domainId: '124',
                name: 'Dust',
                description: 'Dust allergy',
                createdAt: new Date(),
                updatedAt: new Date(),
                deleted: false,
            };
    
            // Mock the Allergy constructor to return the expected object
            Allergy.mockImplementation(() => ({
                ...allergyData,
                domainId: '124', // Mock a generated domain ID
                save: jest.fn().mockResolvedValue(savedAllergy),
            }));
    
            // Spy on AllergyMapper.toDTO
            jest.spyOn(AllergyMapper, 'toDTO').mockImplementation((allergy) => ({
                domainId: allergy.domainId,
                name: allergy.name,
                description: allergy.description,
            }));
    
            const result = await allergyService.createAllergy(allergyData);
    
            // Assert that the Allergy constructor was called with the correct data
            expect(Allergy).toHaveBeenCalledWith(allergyData);
    
            // Assert the result matches the expected DTO
            expect(result).toEqual({
                domainId: '124',
                name: 'Dust',
                description: 'Dust allergy',
            });
        });
    });
       
    describe('updateAllergy', () => {
        it('should update an existing allergy', async () => {
            const allergy = {
                domainId: '123',
                name: 'Pollen',
                description: 'Spring allergy',
                save: jest.fn().mockResolvedValue(true),
            };
            Allergy.findOne.mockResolvedValue(allergy);

            const updatedData = { name: 'Updated Pollen', description: 'Updated description' };
            const result = await allergyService.updateAllergy('123', updatedData);

            expect(Allergy.findOne).toHaveBeenCalledWith({ domainId: '123', deleted: false });
            expect(allergy.save).toHaveBeenCalled();
            expect(result).toEqual(AllergyMapper.toDTO({ ...allergy, ...updatedData }));
        });

        it('should throw an error if the allergy is not found', async () => {
            Allergy.findOne.mockResolvedValue(null);

            await expect(allergyService.updateAllergy('123', {})).rejects.toThrow('Allergy not found');
        });
    });

    describe('softDeleteAllergy', () => {
        it('should soft delete an allergy', async () => {
            const allergy = {
                domainId: '123',
                name: 'Pollen',
                description: 'Spring allergy',
                deleted: false,
                save: jest.fn().mockResolvedValue(true),
            };
            Allergy.findOne.mockResolvedValue(allergy);

            const result = await allergyService.softDeleteAllergy('123');

            expect(Allergy.findOne).toHaveBeenCalledWith({ domainId: '123', deleted: false });
            expect(allergy.deleted).toBe(true);
            expect(allergy.save).toHaveBeenCalled();
            expect(result).toEqual(AllergyMapper.toDTO({ ...allergy, deleted: true }));
        });

        it('should throw an error if the allergy is not found', async () => {
            Allergy.findOne.mockResolvedValue(null);

            await expect(allergyService.softDeleteAllergy('123')).rejects.toThrow('Allergy not found');
        });
    });
});
