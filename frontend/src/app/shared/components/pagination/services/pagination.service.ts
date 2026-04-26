import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/cars';

  constructor() {}

  loadPage(page: number, limit: number) {
    const url = `${this.apiUrl}?page=${page}&limit=${limit}`;
    return this.http.get(url);
  }
}
