const Specialization = require('../persistence/schemas/specializationSchema');
const SpecializationService = require('./specializationService');
const SpecializationMapper = require('../mappers/specializationMapper');

jest.mock('../persistence/schemas/specializationSchema');

describe('SpecializationService', () => {
    let specializationService;

    beforeEach(() => {
        jest.clearAllMocks();
        specializationService = new SpecializationService();
    });

    describe('getAllSpecializations', () => {
        it('should return a paginated list of specializations', async () => {
            const mockSpecializations = [
                { domainId: '123', name: 'Surgeon', description: 'Surgeon specialization', deleted: false },
            ];
            Specialization.find.mockReturnValue({
                skip: jest.fn().mockReturnThis(),
                limit: jest.fn().mockResolvedValue(mockSpecializations),
            });
            Specialization.countDocuments.mockResolvedValue(1);

            const result = await specializationService.getAllSpecializations(1, 10);

            expect(Specialization.find).toHaveBeenCalledWith({ deleted: false });
            expect(Specialization.countDocuments).toHaveBeenCalledWith({ deleted: false });
            expect(result).toEqual({
                total: 1,
                page: 1,
                totalPages: 1,
                data: SpecializationMapper.toDTOs(mockSpecializations),
            });
        });
    });

    describe('getSpecializationByName', () => {
        it('should return a single specialization by name', async () => {
            const mockSpecialization = { domainId: '123', name: 'Surgeon', description: 'Surgeon specialization', deleted: false };
            Specialization.findOne.mockResolvedValue(mockSpecialization);

            const result = await specializationService.getSpecializationByName('Surgeon');

            expect(Specialization.findOne).toHaveBeenCalledWith({ name: 'Surgeon', deleted: false });
            expect(result).toEqual(SpecializationMapper.toDTO(mockSpecialization));
        });

        it('should throw an error if specialization is not found', async () => {
            Specialization.findOne.mockResolvedValue(null);

            await expect(specializationService.getSpecializationByName('Nonexistent')).rejects.toThrow('Specialization not found');
        });
    });

    describe('createSpecialization', () => {
        it('should create and return a new specialization', async () => {
            const specializationData = { name: 'Pediatric', description: 'Pediatric specialization' };
            const savedSpecialization = {
                domainId: '124',
                name: 'Pediatric',
                description: 'Pediatric specialization',
                createdAt: new Date(),
                updatedAt: new Date(),
                deleted: false,
            };
    
            // Mock the Specialization constructor to return the expected object
            Specialization.mockImplementation(() => ({
                ...specializationData,
                domainId: '124', // Mock a generated domain ID
                save: jest.fn().mockResolvedValue(savedSpecialization),
            }));
    
            // Spy on SpecializationMapper.toDTO
            jest.spyOn(SpecializationMapper, 'toDTO').mockImplementation((specialization) => ({
                domainId: specialization.domainId,
                name: specialization.name,
                description: specialization.description,
            }));
    
            const result = await specializationService.createSpecialization(specializationData);
    
            // Assert that the Specialization constructor was called with the correct data
            expect(Specialization).toHaveBeenCalledWith(specializationData);
    
            // Assert the result matches the expected DTO
            expect(result).toEqual({
                domainId: '124',
                name: 'Pediatric',
                description: 'Pediatric specialization',
            });
        });
    });
       
    describe('updateSpecialization', () => {
        it('should update an existing specialization', async () => {
            const specialization = {
                domainId: '123',
                name: 'Surgeon',
                description: 'Surgeon specialization',
                save: jest.fn().mockResolvedValue(true),
            };
            Specialization.findOne.mockResolvedValue(specialization);

            const updatedData = { name: 'Updated Surgeon', description: 'Updated description' };
            const result = await specializationService.updateSpecialization('123', updatedData);

            expect(Specialization.findOne).toHaveBeenCalledWith({ domainId: '123', deleted: false });
            expect(specialization.save).toHaveBeenCalled();
            expect(result).toEqual(SpecializationMapper.toDTO({ ...specialization, ...updatedData }));
        });

        it('should throw an error if the specialization is not found', async () => {
            Specialization.findOne.mockResolvedValue(null);

            await expect(specializationService.updateSpecialization('123', {})).rejects.toThrow('Specialization not found');
        });
    });

    describe('softDeleteSpecialization', () => {
        it('should soft delete an specialization', async () => {
            const specialization = {
                domainId: '123',
                name: 'Surgeon',
                description: 'Surgeon specialization',
                deleted: false,
                save: jest.fn().mockResolvedValue(true),
            };
            Specialization.findOne.mockResolvedValue(specialization);

            const result = await specializationService.softDeleteSpecialization('123');

            expect(Specialization.findOne).toHaveBeenCalledWith({ domainId: '123', deleted: false });
            expect(specialization.deleted).toBe(true);
            expect(specialization.save).toHaveBeenCalled();
            expect(result).toEqual(SpecializationMapper.toDTO({ ...specialization, deleted: true }));
        });

        it('should throw an error if the specialization is not found', async () => {
            Specialization.findOne.mockResolvedValue(null);

            await expect(specializationService.softDeleteSpecialization('123')).rejects.toThrow('Specialization not found');
        });
    });
});
