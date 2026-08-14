const Industry = require("../models/Industry");

// Create Industry
const createIndustry = async (req, res) => {
    try {
        const { name, description } = req.body;

        const industry = await Industry.create({
            name,
            description
        });

        res.status(201).json({
            success: true,
            message: "Industry created successfully",
            data: industry
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get all Industries
const getIndustries = async (req, res) => {
    try {
        const industries = await Industry.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: industries.length,
            data: industries
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createIndustry,
    getIndustries
};