import { Booking } from "../models/booking.model";
import { GET, POST } from "./apiService";

export const getBookings = async () => {
    try {
        return await GET("bookings");
    } catch (error) {
        console.error("Error fetching bookings:", error);
        throw error;
    }
};

export const createBooking = async (bookingData: Booking) => {
    try {
        return await POST("bookings", bookingData);
    } catch (error) {
        console.error("Error creating booking:", error);
        throw error;
    }
};