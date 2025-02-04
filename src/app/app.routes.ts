import { Routes } from '@angular/router';
import { LoginComponent } from './layout/login/login.component';
import { RegisterComponent } from './layout/register/register.component';
import { LayoutComponent } from './layout/main_layout/layout.component';
import { ProfilComponent } from './layout/profil/profil.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { NotFoundComponent } from './layout/not-found/not-found.component';



export const routes: Routes = [
    {
        path: '', redirectTo:'login', pathMatch: 'full'
    },
    {
        path: 'layout',
        loadComponent: () => import('./layout/main_layout/layout.component').then(c => c.LayoutComponent),
        children: [
            {
                path: 'profile',
                loadComponent: () => import('./layout/profil/profil.component').then(c => c.ProfilComponent),
                outlet: 'aux'
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: '**',
        component: NotFoundComponent
    } 
];
