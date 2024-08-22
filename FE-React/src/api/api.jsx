import axios from "axios";

const apiExpressUrl = import.meta.env.VITE_API_EXPRESS;
const apiNestUrl = import.meta.env.VITE_API_NESTJS;

console.log("API URL:", apiExpressUrl);
console.log("API URL:", apiNestUrl);

export const getCustomersExpress = async (page = 1, sort = '', nama = '') => {
    try {
        const response = await axios.get(`${apiExpressUrl}/customers`, {
            params: { page, sort, nama },
        });
        console.log(`${apiExpressUrl}/customers?page=${page}&sort=${sort}&nama=${nama}`);
        return response.data.data;
    } catch (error) {
        console.log("Error getting customers:", error);
        throw error;
    }
}

export const getCustomersNest = async (page = 1, sort = '', nama = '') => {
    try {
        const response = await axios.get(`${apiNestUrl}/customers`, {
            params: { page, sort, nama },
        });
        console.log(`${apiNestUrl}/customers?page=${page}&sort=${sort}&nama=${nama}`);
        return response.data.data;
    } catch (error) {
        console.log("Error getting customers:", error);
        throw error;
    }
}

export const addCustomerExpress = async (nama, alamat, kota) => {
    try {
        const response = await axios.post(`${apiExpressUrl}/customers`, {
            nama,
            alamat,
            kota,
        })
        return response;
    } catch (error) {
        console.log("Error adding customer:", error);
        throw error;
    }
}

export const addCustomerNest = async (nama, alamat, kota) => {
    try {
        const response = await axios.post(`${apiNestUrl}/customers`, {
            nama,
            alamat,
            kota,
        })
        return response;
    } catch (error) {
        console.log("Error adding customer:", error);
        throw error;
    }
}

export const updateCustomerExpress = async (id, nama, alamat, kota) => {
    try {
        const response = await axios.put(`${apiExpressUrl}/customers/${id}`, {
            nama,
            alamat,
            kota,
        });
        return response;
    } catch (error) {
        console.error("Error in updateCustomerExpress:", error);
        throw error;
    }
};

export const updateCustomerNest = async (id, nama, alamat, kota) => {
    try {
        const response = await axios.put(`${apiNestUrl}/customers/${id}`, {
            nama,
            alamat,
            kota,
        });
        return response;
    } catch (error) {
        console.error("Error in updateCustomerNest:", error);
        throw error;
    }
};

export const deleteCustomerExpress = async (id) => {
    try {
        const response = await axios.delete(`${apiExpressUrl}/customers/${id}`);
        return response;
    } catch (error) {
        console.error("Error in deleteCustomerExpress:", error);
        throw error;
    }
}

export const deleteCustomerNest = async (id) => {
    try {
        const response = await axios.delete(`${apiNestUrl}/customers/${id}`);
        return response;
    } catch (error) {
        console.log("Error in deleteCustomerNest:", error);
        throw error;
    }
}