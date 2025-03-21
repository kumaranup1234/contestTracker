const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors')
const contestRoutes = require('./src/routes/contestRoutes');
const videoRoutes = require('./src/routes/videoRoutes');
const { connectDB } = require('./src/config/db');



const app = express();
const port = process.env.PORT || 3000;
app.use(cors({
    origin: ["https://contest-tracker-snowy.vercel.app", "http://localhost:5173"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());

app.use('/api/contests', contestRoutes);
app.use('/api/solutions', videoRoutes);

connectDB();

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
