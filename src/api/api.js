import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const apiUrl = process.env.BASE_API_MELI

const api = axios.create({
	baseURL: apiUrl,
	timeout: 1000 * 60 * 45,
});

export default api