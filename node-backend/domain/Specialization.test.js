const Specialization = require('./Specialization');

describe('Specialization', () => {
  test('should create a valid specialization instance', () => {
    const specialization = new Specialization(1, 'Marketing', 'Specialization in marketing');
    expect(specialization.domainId).toBe(1);
    expect(specialization.name).toBe('Marketing');
    expect(specialization.description).toBe('Specialization in marketing');
    expect(specialization.deleted).toBe(false);
  });

  test('should throw an error if name contains invalid characters', () => {
    expect(() => {
      new Specialization(1, 'Marketing123', 'Specialization in marketing');
    }).toThrow('Invalid name');
  });

  test('should throw an error if name is empty', () => {
    expect(() => {
      new Specialization(1, '', 'Specialization in marketing');
    }).toThrow('Invalid name');
  });

  test('should throw an error if description is empty', () => {
    expect(() => {
      new Specialization(1, 'Marketing', '');
    }).toThrow('Invalid description');
  });

  test('should mark specialization as deleted', () => {
    const specialization = new Specialization(1, 'Marketing', 'Specialization in marketing');
    specialization.markAsDeleted();
    expect(specialization.deleted).toBe(true);
  });
});
