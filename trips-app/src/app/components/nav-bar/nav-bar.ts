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
  
  logout() {
    console.log('User logged out');
    this.router.navigate(['/login']);
  }
  
  myTrips() {
    this.activeTab = 'my-trips';
    console.log('Navigating to My Trips');
    this.router.navigate(['/my-trips']);
  }
  
  allTrips() {
    this.activeTab = 'all-trips';
    console.log('Navigating to All Trips');
    this.router.navigate(['/all-trips']);
  }
}
