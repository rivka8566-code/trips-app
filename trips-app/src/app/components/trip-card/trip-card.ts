import { Component , inject, input, OnInit, signal, output} from '@angular/core';
import { getTripById, deleteTrip } from '../../services/tripsService';
import { getBookings } from '../../services/bookingsService';
import { ToastService } from '../../services/toastService';
import { Trip } from '../../models/trip.model';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-card',
  imports: [CommonModule, ConfirmDialogComponent],
  templateUrl: './trip-card.html',
  styleUrl: './trip-card.css',
})
export class TripCard implements OnInit {
  tripId = input<string>('');
  isAdmin? = input<boolean>(false);
  private toastService = inject(ToastService);
  private router = inject(Router);
  trip = signal<Trip | null>(null);
  hasBookings = signal<boolean>(false);
  showDeleteDialog = signal<boolean>(false);
  onTripDeleted? = output<string>();
  inAllTrips = signal<boolean>(true)

  async ngOnInit() {
    try {
      const tripData = await getTripById(this.tripId());
      this.trip.set(tripData);
      if(window.location.pathname.includes('my-trips'))
        this.inAllTrips.set(false)

      const bookings = await getBookings();
      const tripHasBookings = bookings.some((b: any) => String(b.tripId) === String(this.tripId()));
      this.hasBookings.set(tripHasBookings);
    }
    catch (error) {
      this.toastService.showError('Error loading trip with ID ' + this.tripId());
      console.error(`Error finding trip with ID ${this.tripId()}:`, error);
    }
  }

  editTrip() {
    this.router.navigate(['/home/edit-trip', this.tripId()]);
  }

  openDeleteDialog() {
    this.showDeleteDialog.set(true);
  }

  closeDeleteDialog() {
    this.showDeleteDialog.set(false);
  }

  async confirmDelete() {
    try {
      await deleteTrip(this.tripId());
      this.toastService.showSuccess('Trip deleted successfully');
      this.showDeleteDialog.set(false);
      this.onTripDeleted?.emit(this.tripId());
    } catch (error) {
      this.toastService.showError('Error deleting trip');
    }
  }

  viewTripDetails() {
    const location = String(window.location.pathname);
    this.router.navigate([location + '/' + this.tripId()]);
  }
}
