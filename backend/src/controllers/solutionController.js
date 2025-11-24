const { fetchSolutionsForContest } = require("../services/youtubeService");
const Contest = require("../models/Contest");

const putVideoLink = async (req, res) => {
    const token = req.query.token;
    const secretToken = process.env.CRON_SECRET_TOKEN;

    if (!token || token !== secretToken) {
        return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }

    try {
        const contests = await Contest.find({});

        if (contests.length === 0) {
            return res.status(404).json({ message: "No contests found." });
        }

        // run fetch in parallel
        await Promise.all(contests.map(async (contest) => {
            try {
                console.log(`Fetching solution for ${contest.name}`);
                const result = await fetchSolutionsForContest(contest);
                if (!result) {
                    console.warn(`No video found for ${contest.name}`);
                }
            } catch (error) {
                console.error(`Failed to fetch solution for ${contest.name}: ${error.message}`);
            }
        }));
        res.status(200).json({ message: 'Video links updated for all contests.' });
    } catch (error) {
        console.error('Error fetching contests:', error.message);
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    putVideoLink
}