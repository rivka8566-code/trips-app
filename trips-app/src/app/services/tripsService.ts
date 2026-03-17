import { Trip } from "../models/trip.model";
import { GET, GET_BY_ID, PUT, POST, DELETE } from "./apiService";


export interface TripFilters {
    destination?: string;
    startDate?: string;
    maxPrice?: number;
    sortBy?: 'startDate' | 'price' | 'destination';
}

export const getTrips = async (filters: TripFilters = {}) => {
    try {
        const params: Record<string, any> = {
            _sort: filters.sortBy || 'startDate',
            _order: 'asc',
        };
        let trips = await GET("trips", params);
        if (filters.destination)
            trips = trips.filter((t: any) => t.destination.toLowerCase().includes(filters.destination!.toLowerCase()));
        if (filters.startDate)
            trips = trips.filter((t: any) => t.startDate >= filters.startDate!);
        if (filters.maxPrice != null)
            trips = trips.filter((t: any) => t.price <= filters.maxPrice!);
        return trips;
    } catch (error) {
        console.error("Error fetching trips:", error);
        throw error;
    }
};

export const getTripById = async (id: string) => {
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

export const updateTrip = async (id: string, tripData: Trip) => {
    try {
        return await PUT("trips", id, tripData);
    } catch (error) {
        console.error("Error updating trip:", error);
        throw error;
    }
};

export const deleteTrip = async (id: string) => {
    try {
        return await DELETE("trips", id);
    } catch (error) {
        console.error("Error deleting trip:", error);
        throw error;
    }
};