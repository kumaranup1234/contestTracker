const Contest = require('../models/Contest');
const {syncContestsIfNeeded} = require("../services/syncContest");

const getAllContests = async (req, res) => {
    try {
        await syncContestsIfNeeded();
        const contests = await Contest.find({});
        res.status(200).json(contests);
    } catch (error) {
        console.error('Error fetching contests:', error.message);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllContests,
};
