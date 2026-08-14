const AIOpportunity = require("../models/AIOpportunity");

const createAIOpportunity = async (req, res) => {
    try {
        const opportunity = await AIOpportunity.create(req.body);

        res.status(201).json({
            success: true,
            message: "AI opportunity created successfully",
            data: opportunity
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getAIOpportunitiesByProcess = async (req, res) => {
    try {
        const opportunities = await AIOpportunity.find({
            process: req.params.processId
        })
            .populate("activity", "name sequence")
            .populate("problem", "title severity");

        res.status(200).json({
            success: true,
            count: opportunities.length,
            data: opportunities
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createAIOpportunity,
    getAIOpportunitiesByProcess
};