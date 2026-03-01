import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private router = inject(Router);
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(18)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });
  get name(): FormControl {
    return this.form.controls.name;
  }
  get password(): FormControl {
    return this.form.controls.password;
  }
  get nameInvalid(): boolean {
    return this.form.controls.name.invalid && this.form.controls.name.touched;
  }
  get passwordInvalid(): boolean {
    return this.form.controls.password.invalid && this.form.controls.password.touched;
  }
  submit() {
    if (this.form.valid) {
      console.log('Login successful', this.form.value);

      this.router.navigate(['/all-trips']);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
