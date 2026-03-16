import { Component, OnInit, signal, input, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripCard } from '../trip-card/trip-card';
import { Trip } from '../../models/trip.model';
import { getTrips } from '../../services/tripsService';

@Component({
  selector: 'app-trip-list',
  imports: [CommonModule, TripCard],
  templateUrl: './trip-list.html',
  styleUrl: './trip-list.css',
})
export class TripList implements OnInit {
  isAdmin = input<boolean>(false);
  trips = input<Trip[]>([]);
  allTrips = signal<Trip[]>([]);

  constructor() {
    effect(() => {
      if (this.trips().length > 0)
        this.allTrips.set(this.trips());
    });
  }

  async ngOnInit() {
    if (this.trips().length === 0)
      await this.loadTrips();
  }

  async loadTrips() {
    const tripsData = await getTrips();
    this.allTrips.set(tripsData);
  }

  onTripDeleted = async (tripId: string) => {
    await this.loadTrips();
  }
}
