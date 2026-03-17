import { Component, inject, input, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { getTripById } from '../../services/tripsService';
import { createBooking, deleteBookingById, getBookings } from '../../services/bookingsService';
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
  
  currentUserId: string;

  source = signal<'all-trips' | 'my-trips'>('all-trips');

  constructor() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.currentUserId = String(user.id) || '1';
  } 

  async ngOnInit() {
    const tripId = this.route.snapshot.params['id'];
    try {
      const tripData = await getTripById(tripId);
      this.trip.set(tripData);
      await this.checkIfRegistered(tripId);
    } catch (error) {
      console.error('Error loading trip:', error);
      this.toastService.showError('Error loading trip details');
    }

    const location = window.location.pathname;
    location.includes('all-trips') ? this.source.set('all-trips') : this.source.set('my-trips');
  }

  async checkIfRegistered(tripId: string) {
    try {
      const bookings = await getBookings();
      const isRegistered = bookings.some(
        (b: any) => String(b.tripId) === String(tripId) && String(b.userId) === String(this.currentUserId)
      );
      this.isAlreadyRegistered.set(isRegistered);
      
      const total = bookings
        .filter((b: any) => String(b.tripId) === String(tripId))
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
        id: String(maxId + 1),
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
    this.router.navigate([`/home/${this.source()}`])
  }

  deleteBooking = async () =>  {
    const bookings = await getBookings();
    const booking = bookings.find((b: any) => String(b.tripId) === String(this.trip()!.id) && String(b.userId) === String(this.currentUserId))
    if (booking) {
      await deleteBookingById(booking.id)
      this.toastService.showSuccess('Booking deleted successfully');
      this.router.navigate(['home/my-trips']);
    } else {
      this.toastService.showError('Booking not found');
    }
  }
}
