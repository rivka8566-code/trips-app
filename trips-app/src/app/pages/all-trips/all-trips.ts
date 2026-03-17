import { Component, signal, OnInit, inject } from '@angular/core';
import { TripList } from '../../components/trip-list/trip-list';
import { Router } from '@angular/router';
import { getTrips, TripFilters } from '../../services/tripsService';
import { Trip } from '../../models/trip.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-all-trips',
  imports: [TripList, CommonModule, FormsModule],
  templateUrl: './all-trips.html',
  styleUrl: './all-trips.css',
})
export class AllTrips implements OnInit {
  isAdmin = signal<boolean>(false);
  private router = inject(Router);

  trips = signal<Trip[]>([]);

  filters: TripFilters = {
    sortBy: 'startDate',
  };

  async ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.isAdmin.set(user.isAdmin || false);
    await this.loadTrips();
  }

  async loadTrips() {
    this.trips.set(await getTrips(this.filters));
  }

  async applyFilters() {
    await this.loadTrips();
  }

  async resetFilters() {
    this.filters = { sortBy: 'startDate' };
    await this.loadTrips();
  }

  addTrip() {
    this.router.navigate(['home/add-trip']);
  }
}
