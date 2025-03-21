const { calculateDuration } = require('../utils/calculateDuration');
const axios = require("axios")

async function fetchCodeforcesContests() {
    try {
        const response = await axios.get('https://codeforces.com/api/contest.list');

        if (response.data.status !== 'OK') {
            throw new Error('Failed to fetch Codeforces contests');
        }

        const slicedResponse = response.data.result.slice(0, 100)

        const activeContests = slicedResponse
            .map(contest => ({
                contestId: contest.id,
                platform: 'Codeforces',
                name: contest.name,
                startTimeUnix: contest.startTimeSeconds,
                durationSeconds: contest.durationSeconds,
                url: `https://codeforces.com/contests/${contest.id}`,
                type: contest.type,
                phase: contest.phase,
            }));

        return activeContests;
    } catch (error) {
        console.error('Error fetching Codeforces contests:', error.message);
        return [];
    }
}

module.exports = {
    fetchCodeforcesContests,
}