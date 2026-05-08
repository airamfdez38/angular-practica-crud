import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarBase } from '../../models/car.model';
import { CarsService } from './services/cars.service';
import { Pagination } from '../pagination/pagination';
import { Details } from './components/details/details';
import { CreateForm } from './components/create-form/create-form';
import { EditForm } from './components/edit-form/edit-form';

@Component({
  selector: 'app-cars',
  standalone: true,
  imports: [CommonModule, Pagination, Details, CreateForm, EditForm],
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

  public selectedCar: CarBase | null = null;
  public isDialogOpen = false;
  public isCreateOpen = false;
  public isEditOpen = false;

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

  openDetail(car: CarBase) {
    this.closeAllDialogs();
    this.selectedCar = car;
    this.isDialogOpen = true;
  }

  closeDialog() {
    this.isDialogOpen = false;
    this.selectedCar = null;
  }

  private closeAllDialogs() {
    this.isDialogOpen = false;
    this.isEditOpen = false;
    this.isCreateOpen = false;
    this.selectedCar = null;
  }

  toggleCreate() {
    if (!this.isCreateOpen) {
      this.closeAllDialogs();
      this.isCreateOpen = true;
    } else {
      this.isCreateOpen = false;
    }
  }

  openEdit(car: CarBase) {
    this.closeAllDialogs();
    this.selectedCar = car;
    this.isEditOpen = true;
  }

  closeEdit() {
    this.isEditOpen = false;
    this.selectedCar = null;
  }

  onCarUpdated(updatedCar: CarBase) {
    this.cars = this.cars.map(car =>
      (car as any).id === (updatedCar as any).id ? updatedCar : car
    );
    this.isEditOpen = false;
    this.selectedCar = null;
    this.isCreateOpen = false;

  }

  onCarCreated(newCar: any) {
    this.cars = [newCar, ...this.cars];
    this.isCreateOpen = false;
    this.isEditOpen = false;

  }

}
