const seedDatabase = require('./cypress/tasks/seed');

module.exports = {
  e2e: {
    baseUrl: 'http://localhost:3000', // Replace with your frontend's base URL
    setupNodeEvents(on, config) {
      // Register the custom seedDatabase task
      on('task', {
        seedDatabase() {
          return seedDatabase().then(() => {
            console.log('Database seeded successfully');
            return null; // Cypress requires tasks to return null or a value
          });
        },
      });

      return config;
    },
  },
};
