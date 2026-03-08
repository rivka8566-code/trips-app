import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { getUsers } from '../../services/usersService';
import { createUser } from '../../services/usersService';
import { ToastService } from '../../services/toastService';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private router = inject(Router);
  private toastService = inject(ToastService);
  showPassword = false;
  showConfirmPassword = false;
  
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
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
  
  get email(): FormControl {
    return this.form.controls.email;
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
  
  get emailInvalid(): boolean {
    return this.form.controls.email.invalid && this.form.controls.email.touched;
  }
  
  get passwordInvalid(): boolean {
    return this.form.controls.password.invalid && this.form.controls.password.touched;
  }

  get confirmPasswordInvalid() {
    return this.form.controls.confirmPassword.invalid && this.form.controls.confirmPassword.touched;
  }
  
  get matchPasswordsInvalid(): boolean {
    return this.form.hasError('passwordsNotMatch') && this.form.touched;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  async submit() {
    if (this.form.valid) {
      const users = await getUsers();
      const userExists = users.find((u: User) => u.name === this.form.value.name);
      
      if (userExists) {
        this.toastService.showError('Username already exists');
        return;
      }
      
      const newUser = {
        id: (users.length + 1).toString(),
        name: this.form.value.name!,
        email: this.form.value.email!,
        password: this.form.value.password!,
        isAdmin: false
      };
      
      await createUser(newUser);
      this.toastService.showSuccess('Registration successful!');
      localStorage.setItem('user', JSON.stringify(newUser));
      this.router.navigate(['/home']);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
