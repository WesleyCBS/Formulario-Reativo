import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./view/home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'cadastrar',
    loadComponent: () => import('./view/cadastrar/cadastrar.page').then( m => m.CadastrarPage)
  },
  {
    path: 'detalhar',
    loadComponent: () => import('./view/detalhar/detalhar.page').then( m => m.DetalharPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./view/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'registrar',
    loadComponent: () => import('./view/registrar/registrar.page').then( m => m.RegistrarPage)
  },
];
