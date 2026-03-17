import { User } from "../models/user.model";
import { GET, POST } from "./apiService";

export const getUsers = async () => {
    try{
        return await GET("users");
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

export const findUser = async (name: string, password?: string) => {
    try {
        const params: Record<string, any> = { name };
        if (password) params['password'] = password;
        const users = await GET("users", params);
        return users[0] || null;
    } catch (error) {
        console.error("Error finding user:", error);
        throw error;
    }
};

export const createUser = async (userData: Omit<User, 'id'>) => {
    try {
        return await POST("users", userData);
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};