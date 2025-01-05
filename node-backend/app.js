const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS
const connectDB = require('./api/database/connection'); // Import MongoDB connection
const allergyRoutes = require('./routes/allergyRoutes');
const specializationRoutes = require('./routes/specializationRoutes');
const MedicalConditionService = require('./services/medicalConditionService');
require('dotenv').config();

const app = express();

// Enable CORS
app.use(cors({
    origin: ['http://localhost:3000', 'http://vs606.dei.isep.ipp.pt'], // Allow requests from the frontend
    credentials: true, // Allow credentials like cookies or Authorization headers
}));

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/allergies', allergyRoutes);
app.use('/api/specializations', specializationRoutes);
app.use('/api/medicalConditions', MedicalConditionService);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`
    ################################################
      🛡️  Server listening on port: ${PORT} 🛡️ 
    ################################################`
));

