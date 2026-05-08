import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CarsService } from '../../services/cars.service';
import { CarBase } from '../../../../models/car.model';

@Component({
  selector: 'app-edit-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-form.html',
  styleUrl: './edit-form.css',
})
export class EditForm implements OnChanges {

  @Input() selectedCar: CarBase | null = null;
  @Output() carUpdated = new EventEmitter<any>();
  @Output() cancelEdit = new EventEmitter<void>();

  brands: any[] = [];
  models: any[] = [];

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private carsService: CarsService,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      brandId: ['', Validators.required],
      modelId: ['', Validators.required],
      carDetails: this.fb.array([])
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedCar'] && this.selectedCar) {
      this.loadBrands();
      this.populateForm();
    }
  }

  get carDetails(): FormArray {
    return this.form.get('carDetails') as FormArray;
  }

  createCarDetail(detail?: any): FormGroup {
    return this.fb.group({
      registrationDate: [detail?.registrationDate?.substring(0, 10) || '', Validators.required],
      mileage: [detail?.mileage ?? 0, [Validators.required, Validators.min(0)]],
      price: [detail?.price ?? null, [Validators.required, Validators.min(1)]],
      manufactureYear: [detail?.manufactureYear ?? new Date().getFullYear(), Validators.required],
      currency: [detail?.currency ?? 'EUR', Validators.required],
      availability: [detail?.availability ?? true],
      color: [detail?.color ?? '', Validators.required],
      description: [detail?.description ?? '', Validators.required],
      licensePlate: [
        detail?.licensePlate ?? '',
        [Validators.required, Validators.pattern(/^[0-9]{4}\s[A-Z]{3}$/)]
      ],
    });
  }

  populateForm(): void {
    if (!this.selectedCar) return;

    this.form.patchValue({
      brandId: (this.selectedCar as any).brand?.id,
      modelId: (this.selectedCar as any).model?.id,
    });

    this.carDetails.clear();

    (this.selectedCar as any).carDetails?.forEach((detail: any) => {
      this.carDetails.push(this.createCarDetail(detail));
    });

    this.loadModels((this.selectedCar as any).brand?.id);

    this.cdr.markForCheck();
  }

  loadBrands(): void {
    this.carsService.getBrands().subscribe((res: any) => {
      this.brands = res?.items ?? res ?? [];
      this.cdr.markForCheck();
    });
  }

  loadModels(brandId: string): void {
    if (!brandId) return;
    this.carsService.getModelsByBrand(brandId).subscribe(models => {
      this.models = models;
      this.cdr.markForCheck();
    });
  }

  onSubmit(): void {
    if (this.form.invalid || !this.selectedCar) {
      this.form.markAllAsTouched();
      return;
    }

    const rawValue = this.form.value;

    const payload = {
      ...rawValue,
      carDetails: rawValue.carDetails.map((detail: any) => ({
        ...detail,
        registrationDate: new Date(detail.registrationDate).toISOString(),
        price: Number(detail.price),
        mileage: Number(detail.mileage),
        manufactureYear: Number(detail.manufactureYear),
        licensePlate: detail.licensePlate?.toUpperCase(),
      })),
    };

    this.carsService.updateCar((this.selectedCar as any).id, payload).subscribe({
      next: (response) => {
        this.carUpdated.emit(response);
      },
      error: () => {
        alert('Error al actualizar el coche.');
      }
    });
  }

  onCancel(): void {
    this.cancelEdit.emit();
  }
}
