const FutureActivity = require("../models/FutureActivity");

const createFutureActivity = async (req, res) => {
    try {
        const futureActivity =
            await FutureActivity.create(req.body);

        res.status(201).json({
            success: true,
            message: "Future activity created successfully",
            data: futureActivity
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getFutureActivitiesByProcess = async (req, res) => {
    try {
        const activities = await FutureActivity.find({
            process: req.params.processId
        })
            .populate("currentActivity", "name sequence")
            .populate("responsibleRole", "name type")
            .populate("system", "name type")
            .populate("aiOpportunity", "title technology")
            .sort({ sequence: 1 });

        res.status(200).json({
            success: true,
            count: activities.length,
            data: activities
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createFutureActivity,
    getFutureActivitiesByProcess
};