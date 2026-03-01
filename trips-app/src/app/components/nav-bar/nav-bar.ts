import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  imports: [CommonModule],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar {
  private router = inject(Router);
  activeTab: string = 'all-trips';
  userName = JSON.parse(localStorage.getItem('user') || '{}').name || 'Guest';
  
  logout() {
    console.log('User logged out');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
  
  myTrips() {
    this.activeTab = 'my-trips';
    console.log('Navigating to My Trips');
    this.router.navigate(['/home/my-trips']);
  }
  
  allTrips() {
    this.activeTab = 'all-trips';
    console.log('Navigating to All Trips');
    this.router.navigate(['/home/all-trips']);
  }
}
