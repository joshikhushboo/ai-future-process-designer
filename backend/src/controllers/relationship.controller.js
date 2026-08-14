const Relationship = require("../models/Relationship");

const createRelationship = async (req, res) => {
    try {
        const relationship = await Relationship.create(req.body);

        res.status(201).json({
            success: true,
            message: "Relationship created successfully",
            data: relationship
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getRelationshipsByProcess = async (req, res) => {
    try {
        const relationships = await Relationship.find({
            process: req.params.processId
        });

        res.status(200).json({
            success: true,
            count: relationships.length,
            data: relationships
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createRelationship,
    getRelationshipsByProcess
};