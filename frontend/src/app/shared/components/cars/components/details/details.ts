import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarBase } from '../../../../models/car.model';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.html',
  styleUrls: ['./details.css'],
})
export class Details {

  @Input() selectedCar: CarBase | null = null;
  @Output() closed = new EventEmitter<void>();

  close() {
    this.closed.emit();
  }
}
