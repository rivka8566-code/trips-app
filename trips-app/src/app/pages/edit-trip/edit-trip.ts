import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { getTripById, updateTrip } from '../../services/tripsService';
import { ToastService } from '../../services/toastService';

@Component({
  selector: 'app-edit-trip',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.html',
  styleUrl: './edit-trip.css',
})
export class EditTrip implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toastService = inject(ToastService);
  tripId: number = 0;

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
    this.tripId = Number(this.route.snapshot.params['id']);
    try {
      const tripData = await getTripById(this.tripId);
      this.form.patchValue(tripData);
    } catch (error) {
      console.error('Error loading trip:', error);
      this.toastService.showError('Error loading trip details');
    }
  }

  async saveTrip() {
    if (this.form.valid) {
      try {
        const tripData = {
          id: this.tripId,
          ...this.form.value
        };
        await updateTrip(this.tripId, tripData as any);
        this.toastService.showSuccess('Trip updated successfully!');
        this.router.navigate(['/home/all-trips']);
      } catch (error) {
        console.error('Error updating trip:', error);
        this.toastService.showError('Error updating trip');
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
