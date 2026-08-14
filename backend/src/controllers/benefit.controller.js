const Benefit = require("../models/Benefit");

const createBenefit = async (req, res) => {
    try {
        const benefit = await Benefit.create(req.body);

        res.status(201).json({
            success: true,
            message: "Benefit created successfully",
            data: benefit
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getBenefitsByProcess = async (req, res) => {
    try {
        const benefits = await Benefit.find({
            process: req.params.processId
        }).populate(
            "aiOpportunity",
            "title technology"
        );

        res.status(200).json({
            success: true,
            count: benefits.length,
            data: benefits
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createBenefit,
    getBenefitsByProcess
};