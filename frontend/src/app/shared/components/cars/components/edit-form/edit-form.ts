import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CarsService } from '../../services/cars.service';
import { Car, CarDetail } from '../../../../models/car.model';
import { environment } from '../../../../../../environments/environment';
import { Brand } from '../../../../models/brand.model';
import { Models } from '../../../../models/models.model';


@Component({
  selector: 'app-edit-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-form.html',
  styleUrl: './edit-form.css',
})
export class EditForm implements OnChanges {

  isAdmin = true;
  brands: Brand[] = [];
  models: Models[] = [];
  form: FormGroup;

  @Input() selectedCar: any;
  @Output() carUpdated = new EventEmitter<Car>();
  @Output() cancelEdit = new EventEmitter<void>();



  constructor(
    private fb: FormBuilder,
    private carsService: CarsService,
    private cdr: ChangeDetectorRef
  ) {

    if (environment.authEnabled) {
      this.isAdmin = false;
    } else {
      this.isAdmin = true;
    }

    this.form = this.fb.group({
      brandId: ['', Validators.required],
      modelId: ['', Validators.required],
      carDetails: this.fb.array([])
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedCar'] && this.selectedCar) {
      this.loadBrands();
      this.fillForm();
      this.form.get('brandId')?.disable();
      this.form.get('modelId')?.disable();
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

  fillForm(): void {
    if (!this.selectedCar) return;

    this.form.patchValue({
      brandId: (this.selectedCar as Car).brand?.id,
      modelId: (this.selectedCar as Car).model?.id,
    });

    this.carDetails.clear();

    const details = (this.selectedCar as Car).carDetails;

    if (details?.length) {
      details.forEach((detail: CarDetail) => {
        this.carDetails.push(this.createCarDetail(detail));
      });
    } else {
      this.carDetails.push(this.createCarDetail());
    }

    this.loadModels((this.selectedCar as Car).brand?.id);

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

    const rawValue = this.form.getRawValue();

    const payload = {
      ...rawValue,
      carDetails: rawValue.carDetails.map((detail: CarDetail) => ({
        ...detail,
        registrationDate: new Date(detail.registrationDate).toISOString(),
        price: Number(detail.price),
        mileage: Number(detail.mileage),
        manufactureYear: Number(detail.manufactureYear),
        licensePlate: detail.licensePlate?.toUpperCase(),
      })),
    };

    this.carsService.updateCar((this.selectedCar as Car).id, payload).subscribe({
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
