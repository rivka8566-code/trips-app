import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { getTripById } from '../../services/tripsService';
import { createBooking, getBookings } from '../../services/bookingsService';
import { Trip } from '../../models/trip.model';
import { ToastService } from '../../services/toastService';

@Component({
  selector: 'app-details-trip',
  imports: [CommonModule, FormsModule],
  templateUrl: './details-trip.html',
  styleUrl: './details-trip.css',
})
export class DetailsTrip implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toastService = inject(ToastService);
  trip = signal<Trip | null>(null);
  numberOfParticipants = signal<number>(1);
  isAlreadyRegistered = signal<boolean>(false);
  totalParticipants = signal<number>(0);
  currentUserId = 1; 

  async ngOnInit() {
    const tripId = Number(this.route.snapshot.params['id']);
    try {
      const tripData = await getTripById(tripId);
      this.trip.set(tripData);
      await this.checkIfRegistered(tripId);
    } catch (error) {
      console.error('Error loading trip:', error);
      this.toastService.showError('Error loading trip details');
    }
  }

  async checkIfRegistered(tripId: number) {
    try {
      const bookings = await getBookings();
      const isRegistered = bookings.some(
        (b: any) => Number(b.tripId) === tripId && b.userId === this.currentUserId
      );
      this.isAlreadyRegistered.set(isRegistered);
      
      const total = bookings
        .filter((b: any) => Number(b.tripId) === tripId)
        .reduce((sum: number, b: any) => sum + (b.people || 0), 0);
      this.totalParticipants.set(total);
    } catch (error) {
      console.error('Error checking registration:', error);
    }
  }

  async registerToTrip() {
    if (this.isAlreadyRegistered()) {
      this.toastService.showError('Already registered to this trip');
      return;
    }

    try {
      const bookings = await getBookings();
      const maxId = bookings.length > 0 ? Math.max(...bookings.map((b: any) => Number(b.id))) : 0;
      
      await createBooking({
        id: maxId + 1,
        userId: this.currentUserId,
        tripId: this.trip()!.id,
        people: this.numberOfParticipants()
      });
      this.toastService.showSuccess('Successfully registered to trip!');
      this.isAlreadyRegistered.set(true);
      this.totalParticipants.set(this.totalParticipants() + this.numberOfParticipants());
    } catch (error) {
      console.error('Error registering to trip:', error);
      this.toastService.showError('Error registering to trip');
    }
  }

  goBack() {
    this.router.navigate(['/home/all-trips']);
  }
}
