import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CarBase } from '../../../models/car.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarsService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/cars';

  constructor() {}

  getCars(page: number = 1, limit: number = 10) {
    const url = `${this.apiUrl}?page=${page}&limit=${limit}`;
    return this.http.get<{ items: CarBase[]; meta: any }>(url);
  }

  
}
