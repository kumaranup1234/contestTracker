const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Connected!");
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};

module.exports = {
    connectDB
}
