import axios from "axios";

const BASE_URL = "http://localhost:3000"

export const api = axios.create({
  baseURL: BASE_URL
});


export const GET = async (nativ: string) => {
    const response = await api.get(`/${nativ}`);
    return response.data;
};

export const GET_BY_ID = async (nativ: string, id: string) => {
    const response = await api.get(`/${nativ}/${id}`);
    return response.data;
};

export const PUT = async (nativ: string, id: string, body: any) => {
    const response = await api.put(`/${nativ}/${id}`, body);
    return response.data;
};

export const POST = async (nativ: string, body: any) => {
    const response = await api.post(`/${nativ}`, body);
    return response.data;
};

export const DELETE = async (nativ: string, id: string) => {
    const response = await api.delete(`/${nativ}/${id}`);
    return response.data;
};