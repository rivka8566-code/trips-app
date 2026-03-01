import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private router = inject(Router);
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
  }, { validators: this.passwordsMatch });

  passwordsMatch(group: AbstractControl) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsNotMatch: true };
  }
  get name(): FormControl {
    return this.form.controls.name;
  }
  get password(): FormControl {
    return this.form.controls.password;
  }

  get confirmPassword(): FormControl {
    return this.form.controls.confirmPassword;
  }
  get nameInvalid(): boolean {
    return this.form.controls.name.invalid && this.form.controls.name.touched;
  }
  get passwordInvalid(): boolean {
    return this.form.controls.password.invalid && this.form.controls.password.touched;
  }

  get confirmPasswordInvalid() {
    return this.form.controls.confirmPassword.invalid && this.form.controls.confirmPassword.touched
  }
  get matchPasswordsInvalid(): boolean {
    return this.form.hasError('passwordsNotMatch') && this.form.touched;
  }

  submit() {
    if (this.form.valid) {
      console.log('Registration successful', this.form.value);

      this.router.navigate(['/all-trips']);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
