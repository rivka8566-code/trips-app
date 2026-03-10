import { Booking } from "../models/booking.model";
import { DELETE, GET, POST } from "./apiService";

export const getBookings = async () => {
    try {
        return await GET("bookings");
    } catch (error) {
        console.error("Error fetching bookings:", error);
        throw error;
    }
};

export const getBookingsByUserId = async (userId: string) => {
    try{
        return await GET(`bookings/?userId=${userId}`);
    }catch (error) {
        console.error("Error fetching bookings for user:", userId);
        throw error;
    }
}

export const createBooking = async (bookingData: Booking) => {
    try {
        return await POST("bookings", bookingData);
    } catch (error) {
        console.error("Error creating booking:", error);
        throw error;
    }
};

export const deleteBookingById = async (bookingId: string) => {
    try {
        return await DELETE('bookings', bookingId);
    } catch (error) {
        console.error("Error deleting booking:", error);
        throw error;
    }
};