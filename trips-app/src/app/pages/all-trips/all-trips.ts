import { Component, signal, OnInit, inject } from '@angular/core';
import { TripList } from '../../components/trip-list/trip-list';
import { Router } from '@angular/router';
import { getTrips } from '../../services/tripsService';
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

  allTrips = signal<Trip[]>([]);
  filteredTrips = signal<Trip[]>([]);

  filterDestination = '';
  filterDate = '';
  filterMaxPrice: number | null = null;
  sortBy = 'date';

  async ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.isAdmin.set(user.isAdmin || false);
    const trips = await getTrips();
    this.allTrips.set(trips);
    this.filteredTrips.set(trips);
  }

  applyFilters() {
    let result = [...this.allTrips()];

    if (this.filterDestination)
      result = result.filter(t => t.destination.toLowerCase().includes(this.filterDestination.toLowerCase()));

    if (this.filterDate)
      result = result.filter(t => t.startDate >= this.filterDate);

    if (this.filterMaxPrice !== null)
      result = result.filter(t => t.price <= this.filterMaxPrice!);

    if (this.sortBy === 'date')
      result.sort((a, b) => a.startDate.localeCompare(b.startDate));
    else if (this.sortBy === 'price')
      result.sort((a, b) => a.price - b.price);
    else if (this.sortBy === 'destination')
      result.sort((a, b) => a.destination.localeCompare(b.destination));

    this.filteredTrips.set(result);
  }

  resetFilters() {
    this.filterDestination = '';
    this.filterDate = '';
    this.filterMaxPrice = null;
    this.sortBy = 'date';
    this.filteredTrips.set(this.allTrips());
  }

  addTrip() {
    this.router.navigate(['home/add-trip']);
  }
}
