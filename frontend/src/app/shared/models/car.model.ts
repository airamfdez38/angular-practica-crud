import { Brand } from "./brand.model";
import { Models } from "./models.model";

export interface CarBase {
  id: string;
  brand: Brand;
  model: Models;
  total: number;
  imageUrl: string;
}

export interface Car extends CarBase {
  carDetails: CarDetail[];
}

export interface CarDetail {
  registrationDate: string;
  mileage: number;
  currency: string;
  price: number;
  manufactureYear: number;
  availability: boolean;
  color: string;
  description: string;
  licensePlate: string;
  imageUrl: string;
}
