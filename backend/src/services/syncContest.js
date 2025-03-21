const Contest = require("../models/Contest");
const {fetchCodeforcesContests} = require("./codeforcesService");
const {fetchCodechefContests} = require("./codechefService");
const {fetchLeetcodeContests} = require("./leetcodeService");

const syncContestsIfNeeded = async () => {
    const contest = await Contest.findOne({});

    const currentTime = new Date();
    let timeAfter24Hours;

    if (contest) {
        const lastUpdated = new Date(contest.lastUpdated);
        timeAfter24Hours = new Date(lastUpdated);
        timeAfter24Hours.setHours(timeAfter24Hours.getHours() + 24);
    }

    if (!contest || currentTime >= timeAfter24Hours) {
        console.log('No contests found. Syncing contests for the first time...');

        const codeforces = await fetchCodeforcesContests();
        const codechef = await fetchCodechefContests();
        const leetcode = await fetchLeetcodeContests();

        console.log(codeforces.length);

        const allContests = [...codeforces, ...codechef, ...leetcode];

        for (const contest of allContests) {
            await Contest.findOneAndUpdate(
                { contestId: contest.contestId },
                contest,
                { upsert: true, new: true }
            );
        }
        console.log('All contests inserted successfully.');
    } else{
        console.log('Contests already exist. No sync needed.');
    }

};

module.exports = {
    syncContestsIfNeeded
}