const axios = require("axios")

async function fetchCodechefContests() {
    try {
        const response = await axios.get('https://www.codechef.com/api/list/contests/all');

        if (!response.data.future_contests) {
            throw new Error('Failed to fetch CodeChef contests');
        }

        const allContests = [
            ...response.data.future_contests,
            ...response.data.past_contests,
        ];

        const contests = allContests.map(contest => {
            const startTime = new Date(contest.contest_start_date_iso);
            const endTime = new Date(contest.contest_end_date_iso);
            const currentTime = new Date();

            let phase;
            if (currentTime < startTime) {
                phase = 'BEFORE';
            } else if (currentTime >= startTime && currentTime <= endTime) {
                phase = 'RUNNING';
            } else {
                phase = 'FINISHED';
            }

            return {
                platform: 'CodeChef',
                name: contest.contest_name,
                contestId: contest.contest_code,
                startTimeUnix: Math.floor(new Date(contest.contest_start_date).getTime() / 1000),
                endTime: endTime.toISOString(),
                durationSeconds: Number(contest.contest_duration) * 60,
                url: `https://www.codechef.com/${contest.contest_code}`,
                phase,
                lastUpdated: new Date()
            };
        });

        return contests;
    } catch (error) {
        console.error('Error fetching CodeChef contests:', error.message);
        return [];
    }
}


module.exports = {
    fetchCodechefContests,
}