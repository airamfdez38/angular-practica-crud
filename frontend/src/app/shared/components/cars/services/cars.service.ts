import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Car, CarBase } from '../../../models/car.model';
import { Brand } from '../../../models/brand.model';
import { Models } from '../../../models/models.model';

@Injectable({
  providedIn: 'root',
})
export class CarsService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/cars';

  getCars(page: number = 1, limit: number = 5) {
    const url = `${this.apiUrl}?page=${page}&limit=${limit}`;
    return this.http.get<{ items: CarBase[]; meta: any }>(url);
  }

  createCar(payload: any) {
    return this.http.post<Car>(this.apiUrl, payload);
  }

  updateCar(id: string, payload: any) {
    return this.http.put<Car>(`${this.apiUrl}/${id}`, payload);
  }

  getBrands() {
    return this.http.get<Brand[]>('http://localhost:3000/brands');
  }

  getModelsByBrand(brandId: string) {
    return this.http.get<Models[]>(`http://localhost:3000/brands/${brandId}/models`);
  }



  
}
