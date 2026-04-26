import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarBase } from '../../models/car.model';
import { CarsService } from './services/cars.service';
import { Pagination } from '../pagination/pagination';

@Component({
  selector: 'app-cars',
  standalone: true,
  imports: [CommonModule, Pagination],
  templateUrl: './cars.html',
  styleUrls: ['./cars.css'],
})
export class Cars implements OnInit {

  public carsService = inject(CarsService);
  public cars: CarBase[] = [];
  public meta: { currentPage: number; totalPages: number } = {
    currentPage: 1,
    totalPages: 1,
  };

  constructor() { }

  ngOnInit(): void {
    this.loadPage(1);
  }

  loadPage(page: number) {
    this.carsService.getCars(page).subscribe(res => {
      console.log('res', res);
      console.log('ITEMS', res.items);
      console.log('META', res.meta.currentPage, res.meta.totalPages);
      this.meta = res.meta;
      this.cars = [...res.items];
    });
  }

}
