const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const SpecializationSchema = new mongoose.Schema(
    {
        domainId: {
            type: String,
            unique: true,
            required: true,
            default: uuidv4, // Automatically generate a unique domainId
        },
        name: {
            type: String,
            unique: true,
            required: true,
        },
        description: {
            type: String,
        },
        deleted: {
            type: Boolean,
            default: false, // Soft-delete flag
        },
    },
    {
        timestamps: true, // Automatically manage createdAt and updatedAt fields
    }
);

module.exports = mongoose.model('Specialization', SpecializationSchema);
