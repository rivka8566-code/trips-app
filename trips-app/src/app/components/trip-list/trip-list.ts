import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripCard } from '../trip-card/trip-card';
import { Trip } from '../../models/trip.model';

@Component({
  selector: 'app-trip-list',
  imports: [CommonModule, TripCard],
  templateUrl: './trip-list.html',
  styleUrl: './trip-list.css',
})
export class TripList {
  isAdmin = input<boolean>(false);
  trips = input<Trip[]>([]);
  
  tripDeleted = output<string>();

  onTripDeleted = (tripId: string) => {
    this.tripDeleted.emit(tripId);
  }
}
