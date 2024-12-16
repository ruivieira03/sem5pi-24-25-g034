const sequelize = require('./database/connection'); // Database connection
const Allergy = require('./models/allergyModel');   // Model definition

(async () => {
    try {
        // Synchronize the database, ensuring tables exist or are updated
        await sequelize.sync({ alter: true });
        console.log('Database synced successfully.');
    } catch (error) {
        console.error('Error syncing the database:', error);
    } finally {
        await sequelize.close(); // Close the database connection
        console.log('Connection closed.');
    }
})();
