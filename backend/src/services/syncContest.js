const Contest = require("../models/Contest");
const { fetchCodeforcesContests } = require("./codeforcesService");
const { fetchCodechefContests } = require("./codechefService");
const { fetchLeetcodeContests } = require("./leetcodeService");

const syncContestsIfNeeded = async () => {
    const contestCount = await Contest.countDocuments();
    const latestContest = await Contest.findOne({}, {}, { sort: { lastUpdated: -1 } });
    const currentTime = new Date();

    if (contestCount === 0 || !latestContest || currentTime - latestContest.lastUpdated >= 24 * 60 * 60 * 1000) {
        console.log('Syncing contests..');

        const [codeforces, codechef, leetcode] = await Promise.all([
            fetchCodeforcesContests(),
            fetchCodechefContests(),
            fetchLeetcodeContests()
        ]);
        const allContests = [...codeforces, ...codechef, ...leetcode];

        const bulkOps = allContests.map(contest => ({
            updateOne: {
                filter: { contestId: contest.contestId },
                update: { $set: contest },
                upsert: true,
            }
        }));
        await Contest.bulkWrite(bulkOps);

        console.log('All contests inserted or updated successfully.');
    } else {
        console.log('Contests are up-to-date. No sync needed.');
    }
};

module.exports = {
    syncContestsIfNeeded
};
