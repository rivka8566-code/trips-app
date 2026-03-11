import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { getTripById, updateTrip, createTrip, getTrips } from '../../services/tripsService';
import { ToastService } from '../../services/toastService';

@Component({
  selector: 'app-edit-and-add-trip',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-and-add-trip.html',
  styleUrl: './edit-and-add-trip.css',
})
export class EditAndAddTrip implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toastService = inject(ToastService);
  tripId: string = '';
  isEditMode = signal<boolean>(false);

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    destination: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    image: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required])
  });

  get name() { return this.form.get('name')!; }
  get destination() { return this.form.get('destination')!; }
  get startDate() { return this.form.get('startDate')!; }
  get endDate() { return this.form.get('endDate')!; }
  get price() { return this.form.get('price')!; }
  get image() { return this.form.get('image')!; }
  get description() { return this.form.get('description')!; }

  async ngOnInit() {
    if (this.route.snapshot.params['id']) {
      this.isEditMode.set(true);
      this.tripId = this.route.snapshot.params['id'];
      try {
        const tripData = await getTripById(this.tripId);
        this.form.patchValue(tripData);
      } catch (error) {
        console.error('Error loading trip:', error);
        this.toastService.showError('Error loading trip details');
      }
    } else {
      this.isEditMode.set(false);
    }
  }

  async saveTrip() {
    if (this.form.valid) {
      try {
        if (this.isEditMode()) {
          const tripData = {
            id: this.tripId,
            ...this.form.value
          };
          await updateTrip(this.tripId, tripData as any);
          this.toastService.showSuccess('Trip updated successfully!');
        } else {
          const trips = await getTrips();
          const maxId = trips.length > 0 ? Math.max(...trips.map((t: any) => Number(t.id))) : 0;
          const tripData = {
            id: String(maxId + 1),
            ...this.form.value
          };
          await createTrip(tripData as any);
          this.toastService.showSuccess('Trip created successfully!');
        }
        this.router.navigate(['/home/all-trips']);
      } catch (error) {
        console.error('Error saving trip:', error);
        this.toastService.showError('Error saving trip');
      }
    } else {
      this.form.markAllAsTouched();
      this.toastService.showError('Please fill all required fields');
    }
  }

  cancel() {
    this.router.navigate(['/home/all-trips']);
  }
}
