import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { getUsers, findUser } from '../../services/usersService';
import { ToastService } from '../../services/toastService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private router = inject(Router);
  private toastService = inject(ToastService);
  
  showPassword = false;

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(18), ]),
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

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async submit() {
    if (this.form.valid) {
      const user = await findUser(this.form.value.name!, this.form.value.password!);
      
      if (user) {
        this.toastService.showSuccess('Login successful!');
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['/home']);
      } else {
        this.toastService.showError('Invalid username or password');
      }
    } else {
      this.form.markAllAsTouched();
    }
  }
}
