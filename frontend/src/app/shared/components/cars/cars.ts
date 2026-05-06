import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
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
  private cdr = inject(ChangeDetectorRef);

  public cars: CarBase[] = [];
  public meta: { currentPage: number; totalPages: number } = {
    currentPage: 1,
    totalPages: 1,
  };

  constructor() {}

  ngOnInit(): void {
    this.loadPage(1);
  }

  loadPage(page: number) {
    this.carsService.getCars(page).subscribe(res => {
      this.meta = res.meta;
      this.cars = res.items ?? [];

      this.cdr.detectChanges();
    });
  }

}
