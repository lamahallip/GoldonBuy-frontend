import { Routes } from '@angular/router';
import { LoginComponent } from './layout/login/login.component';
import { RegisterComponent } from './layout/register/register.component';
import { LayoutComponent } from './layout/main_layout/layout.component';



export const routes: Routes = [
    {
        path: '', redirectTo:'login', pathMatch: 'full'
    },
    {
        path: 'layout',
        component: LayoutComponent,
        children: []
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    
];
