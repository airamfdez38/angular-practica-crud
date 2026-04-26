import { Routes } from '@angular/router';
import { Layout } from './core/layout/layout/layout';
import { Home } from './shared/components/home/home';
import { Cars } from './shared/components/cars/cars';
export const routes: Routes = [
    {
        path: '',
        component: Layout,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: Home },
            { path: 'cars', component: Cars }
        ]
    }
];
