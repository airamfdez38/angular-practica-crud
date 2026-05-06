import { Routes } from "@angular/router";
import { Layout } from "./core/layout/layout/layout";
import { Cars } from "./shared/components/cars/cars";

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', component: Cars }
    ]
  }
];
