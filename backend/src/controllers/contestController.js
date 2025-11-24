const Contest = require('../models/Contest');
const {syncContestsIfNeeded} = require("../services/syncContest");

const getAllContests = async (req, res) => {
    try {
        const exists = await Contest.exists({});
        if (!exists) {
            await syncContestsIfNeeded();
        }

        const projection = {
            name: 1,
            platform: 1,
            startTimeUnix: 1,
            durationSeconds: 1,
            url: 1,
            phase: 1,
            _id: 0,
        };
        const contests = await Contest.find({}, projection, { lean: true });

        return res.status(200).json(contests);
    } catch (error) {
        console.error('Error fetching contests:', error.message);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllContests,
};
