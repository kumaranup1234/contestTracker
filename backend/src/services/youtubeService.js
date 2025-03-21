const axios = require('axios');
const Contest = require('../models/Contest');

const API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;


const fetchSolutionsForContest = async (contest) => {

    if (contest.solutionLink){
        console.log(`Solution already exists for ${contest.name}. Skipping update.`);
        return;
    }

    try {
        const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                part: 'snippet',
                channelId: CHANNEL_ID,
                q: `${contest.name} Solution`,
                type: 'video',
                key: API_KEY,
            },
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });

        const videos = response.data.items;
        if (videos.length === 0) {
            console.log(`No solution found for ${contest.name}`);
            return null;
        }

        const videoId = videos[0].id.videoId;
        const videoLink = `https://www.youtube.com/watch?v=${videoId}`;
        await Contest.findByIdAndUpdate(
            contest._id,
            { solutionLink: videoLink },
            { new: true }
        );
        console.log(`Solution added for ${contest.name}: ${videoLink}`);
        return videoLink;
    } catch (error) {
        console.log(error.response.data);
        console.error(`Error fetching YouTube solution for ${contest.name}:`, error.message);
        return null;
    }
}
module.exports = {
    fetchSolutionsForContest,
}