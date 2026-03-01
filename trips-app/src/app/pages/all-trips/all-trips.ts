import { Component, signal, OnInit } from '@angular/core';
import { TripList } from '../../components/trip-list/trip-list';

@Component({
  selector: 'app-all-trips',
  imports: [TripList],
  templateUrl: './all-trips.html',
  styleUrl: './all-trips.css',
})
export class AllTrips implements OnInit {
  isAdmin = signal<boolean>(false);

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.isAdmin.set(user.isAdmin || false);
  }
}
