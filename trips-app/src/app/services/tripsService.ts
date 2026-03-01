import { Trip } from "../models/trip.model";
import { GET, GET_BY_ID, PUT, POST, DELETE } from "./apiService";


export const getTrips = async () => {
    try {
        return await GET("trips");
    } catch (error) {
        console.error("Error fetching trips:", error);
        throw error;
    }
};

export const getTripById = async (id: number) => {
    try {
        return await GET_BY_ID("trips", id);
    } catch (error) {
        console.error("Error fetching trip by ID:", error);
        throw error;
    }
};

export const createTrip = async (tripData: Trip) => {
    try {
        return await POST("trips", tripData);
    } catch (error) {
        console.error("Error creating trip:", error);
        throw error;
    }
};

export const updateTrip = async (id: number, tripData: Trip) => {
    try {
        return await PUT("trips", id, tripData);
    } catch (error) {
        console.error("Error updating trip:", error);
        throw error;
    }
};

export const deleteTrip = async (id: number) => {
    try {
        return await DELETE("trips", id);
    } catch (error) {
        console.error("Error deleting trip:", error);
        throw error;
    }
};