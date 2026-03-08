import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar {
  private router = inject(Router);
  userName = JSON.parse(localStorage.getItem('user') || '{}').name || 'Guest';
  
  logout() {
    console.log('User logged out');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
