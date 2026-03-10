import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { getBookings } from '../../services/bookingsService';
import { getTripById } from '../../services/tripsService';
import { Trip } from '../../models/trip.model';
import { TripCard } from '../../components/trip-card/trip-card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-trips',
  imports: [RouterLink, TripCard, CommonModule],
  templateUrl: './my-trips.html',
  styleUrl: './my-trips.css',
})
export class MyTrips implements OnInit{

  trips = signal<Trip[]>([]);

  async ngOnInit () {
      await this.loadTrips();
  }

  async loadTrips() {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const userId = String(user.id);
      
      const allBookings = await getBookings();
      const userBookings = allBookings.filter((b: any) => String(b.userId) === userId);
      
      const tripPromises = userBookings.map((booking: any) => getTripById(booking.tripId));
      const tripsData = await Promise.all(tripPromises);
      this.trips.set(tripsData);
  }
}
