import { Component, OnInit, signal, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripCard } from '../trip-card/trip-card';
import { getTrips } from '../../services/tripsService';
import { Trip } from '../../models/trip.model';

@Component({
  selector: 'app-trip-list',
  imports: [CommonModule, TripCard],
  templateUrl: './trip-list.html',
  styleUrl: './trip-list.css',
})
export class TripList implements OnInit {
  isAdmin = input<boolean>(false);
  trips = signal<Trip[]>([]);

  async ngOnInit() {
    await this.loadTrips();
  }

  async loadTrips() {
    const tripsData = await getTrips();
    this.trips.set(tripsData);
  }

  async onTripDeleted(tripId: number) {
    await this.loadTrips();
  }
}
