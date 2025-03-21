const axios = require("axios")

async function fetchLeetcodeContests() {
    try {
        const graphqlQuery = {
            query: `
        query getContestList {
          allContests {
            title
            startTime
            duration
            titleSlug
          }
        }
      `
        };

        const response = await axios.post('https://leetcode.com/graphql', graphqlQuery, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const allContests = response.data.data.allContests.slice(0, 100);
        const now = Date.now();

        const contests = allContests.map(contest => {
            const startTime = new Date(contest.startTime * 1000);
            const endTime = new Date(contest.startTime * 1000 + contest.duration * 1000);

            let phase;
            if (now < startTime.getTime()) {
                phase = 'BEFORE';
            } else if (now >= startTime.getTime() && now <= endTime.getTime()) {
                phase = 'RUNNING';
            } else {
                phase = 'FINISHED';
            }

            return {
                platform: 'LeetCode',
                name: contest.title,
                contestId: contest.titleSlug,
                startTimeUnix: contest.startTime,
                endTime: endTime.toISOString(),
                durationSeconds: contest.duration,
                url: `https://leetcode.com/contest/${contest.titleSlug}`,
                phase,
                lastUpdated: new Date()
            };
        });

        return contests;
    } catch (error) {
        console.error('Error fetching LeetCode contests:', error.message);
        return [];
    }
}

module.exports = {
    fetchLeetcodeContests
}