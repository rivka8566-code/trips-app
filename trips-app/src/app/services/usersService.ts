import { User } from "../models/user.model";
import { GET, GET_BY_ID, POST } from "./apiService";

export const getUsers = async () => {
    try{
        return await GET("users");
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

export const getUserById = async (id: string) => {
    try {
        return await GET_BY_ID("users", id);
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        throw error;
    }
};

    export const createUser = async (userData: User) => {
        try {
            return await POST("users", userData);
        } catch (error) {
            console.error("Error creating user:", error);
            throw error;
        }
    };