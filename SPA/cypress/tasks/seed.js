const mongoose = require('mongoose');
const Allergy = require('../../node-backend/persistence/schemas/allergySchema');

async function seedDatabase() {
  await mongoose.connect('mongodb://mongoadmin:6e68be8276420f1190ffff1f@vsgate-s1.dei.isep.ipp.pt:10557/admin');

  // Clear existing data
  await Allergy.deleteMany({});

  // Insert test data
  await Allergy.insertMany([
    { domainId: '1', name: 'Dust', description: 'Dust allergy', deleted: false },
    { domainId: '2', name: 'Pollen', description: 'Pollen allergy', deleted: false },
  ]);

  console.log('Database seeded');
  mongoose.disconnect();
}

module.exports = seedDatabase;
