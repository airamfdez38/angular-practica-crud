import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css',
})
export class Pagination {

  @Input() meta!: { currentPage: number; totalPages: number };
  @Output() pageChanged = new EventEmitter<number>();

  constructor() {}

  get pages(): number[] {
    return Array.from({ length: this.meta.totalPages }, (_, i) => i + 1);
  }

  loadPage(page: number): void {
    if (page >= 1 && page <= this.meta.totalPages) {
      this.pageChanged.emit(page);
    }
  }
}
