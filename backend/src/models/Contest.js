const mongoose = require('mongoose');

const contestSchema = new mongoose.Schema({
    contestId: { type: String,  unique: true },
    name: { type: String },
    platform: { type: String },
    startTimeUnix: { type: Number },
    type: { type: String },
    durationSeconds: { type: Number },
    url: { type: String },
    phase: { type: String },
    solutionLink: { type: String },
    lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Contest', contestSchema);
