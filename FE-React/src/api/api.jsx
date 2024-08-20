import axios from "axios";

const apiExpressUrl = import.meta.env.VITE_API_EXPRESS;
const apiNestUrl = import.meta.env.VITE_API_NESTJS;

console.log("API URL:", apiExpressUrl);

export const getCustomersExpress = async (page = 1, sort = '', nama = '') => {
    try {
        const response = await axios.get(`${apiExpressUrl}/customers`, {
            params: {page, sort, nama },
        });
        return response.data.data;
    } catch (error) {
        console.log("Error getting customers:", error);
        throw error;
    }
}

export const getCustomersDataNext = async () => {
    try {
        const response = await axios.get(`${apiNestUrl}/customers`);
        return response.data.data;
    } catch (error) {
        console.log("Error getting customers:", error);
        throw error;
    }
}