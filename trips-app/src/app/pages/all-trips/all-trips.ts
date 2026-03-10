import { Component, signal, OnInit, inject } from '@angular/core';
import { TripList } from '../../components/trip-list/trip-list';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-trips',
  imports: [TripList],
  templateUrl: './all-trips.html',
  styleUrl: './all-trips.css',
})
export class AllTrips implements OnInit {
  isAdmin = signal<boolean>(false);
  private router = inject(Router);

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.isAdmin.set(user.isAdmin || false);
  }

  addTrip(){
    this.router.navigate(['home/edit-trip'])
  }
}
