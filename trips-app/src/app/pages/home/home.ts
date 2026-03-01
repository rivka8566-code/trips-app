import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBar } from '../../components/nav-bar/nav-bar';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, NavBar],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
