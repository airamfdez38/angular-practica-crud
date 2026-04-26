import { Component } from '@angular/core';
import { Cars } from "../cars/cars";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Cars],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
