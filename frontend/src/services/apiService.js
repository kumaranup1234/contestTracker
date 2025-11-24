import axios from 'axios'

const API_URL = 'http://localhost:3000/api'
const API_URL_PROD = "https://contest-tracker-backend-five.vercel.app/api"

export const fetchContests = async () => {
    try {
        const response = await axios.get(`${API_URL_PROD}/contests`);
        return response.data;
    } catch (error) {
        console.error('Error fetching contests:', error);
        throw error;
    }
};