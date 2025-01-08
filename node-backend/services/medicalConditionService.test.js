const MedicalCondition = require('../persistence/schemas/medicalConditionSchema');
const MedicalConditionService = require('./medicalConditionService');
const MedicalConditionMapper = require('../mappers/medicalConditionMapper');

jest.mock('../persistence/schemas/medicalConditionSchema');

describe('MedicalConditionService', () => {
    let medicalConditionService;

    beforeEach(() => {
        jest.clearAllMocks();
        medicalConditionService = new MedicalConditionService();
    });

    describe('getAllMedicalConditions', () => {
        it('should return a paginated list of medicalConditions', async () => {
            const mockMedicalConditions = [
                { domainId: '123', name: 'Sick', description: 'Sick medicalCondition', deleted: false },
            ];
            MedicalCondition.find.mockReturnValue({
                skip: jest.fn().mockReturnThis(),
                limit: jest.fn().mockResolvedValue(mockMedicalConditions),
            });
            MedicalCondition.countDocuments.mockResolvedValue(1);

            const result = await medicalConditionService.getAllMedicalConditions(1, 10);

            expect(MedicalCondition.find).toHaveBeenCalledWith({ deleted: false });
            expect(MedicalCondition.countDocuments).toHaveBeenCalledWith({ deleted: false });
            expect(result).toEqual({
                total: 1,
                page: 1,
                totalPages: 1,
                data: MedicalConditionMapper.toDTOs(mockMedicalConditions),
            });
        });
    });

    describe('getMedicalConditionByName', () => {
        it('should return a single medicalCondition by name', async () => {
            const mockMedicalCondition = { domainId: '123', name: 'Sick', description: 'Sick medicalCondition', deleted: false };
            MedicalCondition.findOne.mockResolvedValue(mockMedicalCondition);

            const result = await medicalConditionService.getMedicalConditionByName('Sick');

            expect(MedicalCondition.findOne).toHaveBeenCalledWith({ name: 'Sick', deleted: false });
            expect(result).toEqual(MedicalConditionMapper.toDTO(mockMedicalCondition));
        });

        it('should throw an error if medicalCondition is not found', async () => {
            MedicalCondition.findOne.mockResolvedValue(null);

            await expect(medicalConditionService.getMedicalConditionByName('Nonexistent')).rejects.toThrow('Medical condition not found');
        });
    });

    describe('createMedicalCondition', () => {
        it('should create and return a new medicalCondition', async () => {
            const medicalConditionData = { name: 'Injured', description: 'Injured medicalCondition' };
            const savedMedicalCondition = {
                domainId: '124',
                name: 'Injured',
                description: 'Injured medicalCondition',
                createdAt: new Date(),
                updatedAt: new Date(),
                deleted: false,
            };
    
            // Mock the MedicalCondition constructor to return the expected object
            MedicalCondition.mockImplementation(() => ({
                ...medicalConditionData,
                domainId: '124', // Mock a generated domain ID
                save: jest.fn().mockResolvedValue(savedMedicalCondition),
            }));
    
            // Spy on MedicalConditionMapper.toDTO
            jest.spyOn(MedicalConditionMapper, 'toDTO').mockImplementation((medicalCondition) => ({
                domainId: medicalCondition.domainId,
                name: medicalCondition.name,
                description: medicalCondition.description,
            }));
    
            const result = await medicalConditionService.createMedicalCondition(medicalConditionData);
    
            // Assert that the MedicalCondition constructor was called with the correct data
            expect(MedicalCondition).toHaveBeenCalledWith(medicalConditionData);
    
            // Assert the result matches the expected DTO
            expect(result).toEqual({
                domainId: '124',
                name: 'Injured',
                description: 'Injured medicalCondition',
            });
        });
    });
       
    describe('updateMedicalCondition', () => {
        it('should update an existing medicalCondition', async () => {
            const medicalCondition = {
                domainId: '123',
                name: 'Sick',
                description: 'Sick medicalCondition',
                save: jest.fn().mockResolvedValue(true),
            };
            MedicalCondition.findOne.mockResolvedValue(medicalCondition);

            const updatedData = { name: 'Updated Sick', description: 'Updated description' };
            const result = await medicalConditionService.updateMedicalCondition('123', updatedData);

            expect(MedicalCondition.findOne).toHaveBeenCalledWith({ domainId: '123', deleted: false });
            expect(medicalCondition.save).toHaveBeenCalled();
            expect(result).toEqual(MedicalConditionMapper.toDTO({ ...medicalCondition, ...updatedData }));
        });

        it('should throw an error if the medicalCondition is not found', async () => {
            MedicalCondition.findOne.mockResolvedValue(null);

            await expect(medicalConditionService.updateMedicalCondition('123', {})).rejects.toThrow('Medical condition not found');
        });
    });

    describe('softDeleteMedicalCondition', () => {
        it('should soft delete an medicalCondition', async () => {
            const medicalCondition = {
                domainId: '123',
                name: 'Sick',
                description: 'Sick medicalCondition',
                deleted: false,
                save: jest.fn().mockResolvedValue(true),
            };
            MedicalCondition.findOne.mockResolvedValue(medicalCondition);

            const result = await medicalConditionService.softDeleteMedicalCondition('123');

            expect(MedicalCondition.findOne).toHaveBeenCalledWith({ domainId: '123', deleted: false });
            expect(medicalCondition.deleted).toBe(true);
            expect(medicalCondition.save).toHaveBeenCalled();
            expect(result).toEqual(MedicalConditionMapper.toDTO({ ...medicalCondition, deleted: true }));
        });

        it('should throw an error if the medicalCondition is not found', async () => {
            MedicalCondition.findOne.mockResolvedValue(null);

            await expect(medicalConditionService.softDeleteMedicalCondition('123')).rejects.toThrow('Medical condition not found');
        });
    });
});
