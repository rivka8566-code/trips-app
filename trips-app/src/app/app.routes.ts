import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Home } from './pages/home/home';
import { AllTrips } from './pages/all-trips/all-trips';
import { MyTrips } from './pages/my-trips/my-trips';
import { DetailsTrip } from './pages/details-trip/details-trip';
import { EditTrip } from './pages/edit-trip/edit-trip';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
  
    { path: 'login', component: Login },
    { path: 'register', component: Register },
  
    {
      path: 'home',
      component: Home,
      canActivate: [authGuard],
      children: [
        { path: '', redirectTo: 'all-trips', pathMatch: 'full' },
        { path: 'all-trips', component: AllTrips },
        { path: 'all-trips/:id', component: DetailsTrip },
        { path: 'edit-trip', component: EditTrip, canActivate: [adminGuard] },
        { path: 'edit-trip/:id', component: EditTrip, canActivate: [adminGuard] },
        { path: 'my-trips', component: MyTrips },
        { path: 'my-trips/:id', component: DetailsTrip }
      ]
    }
  ];
