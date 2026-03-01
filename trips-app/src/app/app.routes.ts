import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Home } from './pages/home/home';
import { AllTrips } from './pages/all-trips/all-trips';
import { MyTrips } from './pages/my-trips/my-trips';
import { DetailsTrip } from './pages/details-trip/details-trip';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
  
    { path: 'login', component: Login },
    { path: 'register', component: Register },
  
    {
      path: '',
      component: Home,
      children: [
        { path: '', redirectTo: 'all-trips', pathMatch: 'full' },
        { path: 'all-trips', component: AllTrips },
        { path: 'all-trips/:id', component: DetailsTrip },
        { path: 'my-trips', component: MyTrips },
        { path: 'my-trips/:id', component: DetailsTrip }
      ]
    }
  ];
