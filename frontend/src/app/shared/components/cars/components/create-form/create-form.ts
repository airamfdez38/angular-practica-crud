import { Component, EventEmitter, Output, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CarsService } from '../../services/cars.service';

@Component({
  selector: 'app-create-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-form.html',
  styleUrl: './create-form.css',
})
export class CreateForm implements OnInit {

  @Output() carCreated = new EventEmitter<any>();

  brands: any[] = [];
  models: any[] = [];
  brandsLoaded = false;

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private carsService: CarsService,
    private cdr: ChangeDetectorRef 
  ) {
    this.form = this.fb.group({
      brandId: ['', Validators.required],
      modelId: ['', Validators.required],
      carDetails: this.fb.array([this.createCarDetail()]),
    });

    this.form.get('brandId')?.valueChanges.subscribe((brandId) => {
      if (brandId) {
        this.loadModels(brandId);
      } else {
        this.models = [];
      }
    });
  }

  ngOnInit(): void {
    this.loadBrands();
  }

  get carDetails(): FormArray {
    return this.form.get('carDetails') as FormArray;
  }

  createCarDetail(): FormGroup {
    return this.fb.group({
      registrationDate: ['', Validators.required],
      mileage: [0, [Validators.required, Validators.min(0)]],
      price: [null, [Validators.required, Validators.min(1)]],
      manufactureYear: [
        new Date().getFullYear(),
        [Validators.required, Validators.min(1900)],
      ],
      currency: ['EUR', Validators.required],
      availability: [true],
      color: ['', Validators.required],
      description: ['', Validators.required],
      licensePlate: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]{4}\s[A-Z]{3}$/),
        ],
      ],
    });
  }

  loadBrands(): void {
    this.carsService.getBrands().subscribe({
      next: (response: any) => {
        if (Array.isArray(response)) {
          this.brands = response;
        } else if (response?.items) {
          this.brands = response.items;
        } else if (response?.data) {
          this.brands = response.data;
        } else {
          this.brands = [];
        }

        this.brandsLoaded = true;

        this.cdr.markForCheck(); 
      },
      error: (err) => {
        this.brands = [];
        this.brandsLoaded = true;
        this.cdr.markForCheck();
      },
    });
  }

  loadModels(brandId: string): void {
    this.carsService.getModelsByBrand(brandId).subscribe((models) => {
      this.models = models;
      this.form.get('modelId')?.setValue('');

      this.cdr.markForCheck();
    });
  }

  addCarDetail(): void {
    this.carDetails.push(this.createCarDetail());
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const rawValue = this.form.value;

    const payload = {
      ...rawValue,
      carDetails: rawValue.carDetails
        .filter((d: any) => d.registrationDate)
        .map((detail: any) => ({
          ...detail,
          registrationDate: new Date(detail.registrationDate).toISOString(),
          price: Number(detail.price),
          mileage: Number(detail.mileage),
          manufactureYear: Number(detail.manufactureYear),
          licensePlate: detail.licensePlate?.toUpperCase(),
        })),
    };

    this.carsService.createCar(payload).subscribe({
      next: (response) => {
        this.carCreated.emit(response);

        this.form.reset();
        this.carDetails.clear();
        this.addCarDetail();
      },
      error: (error) => {
        if (error?.status === 409) {
          alert(
            'Conflicto: ya existe un vehículo con la misma matrícula o con la misma combinación marca/modelo.'
          );
        } else {
          alert('Error al crear el coche.');
        }
      },
    });
  }
}
