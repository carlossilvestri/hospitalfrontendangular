import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages/pages.component';

import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { Graficas1Component } from './pages/graficas1/graficas1.component';
import { LoginGuardGuard } from './services/guards/login-guard.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { HospitalesComponent } from './pages/hospitales/hospitales.component';
import { MedicosComponent } from './pages/medicos/medicos.component';
import { MedicoComponent } from './pages/medicos/medico.component';
import { BusquedaComponent } from './pages/busqueda/busqueda.component';
import { AdminGuard } from './services/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [LoginGuardGuard],
    children: [
      // Generales
      { path: 'dashboard', component: DashboardComponent },
      { path: 'progress', component: ProgressComponent },
      { path: 'graficas1', component: Graficas1Component },
      {
        path: 'perfil',
        component: ProfileComponent,
        data: { titulo: 'Perfil de Usuario' },
      },
      { path: 'busqueda/:termino', component: BusquedaComponent, data: {titulo: 'Buscador'} },
      // Mantenimientos
      { path: 'usuarios', canActivate: [AdminGuard], component: UsuariosComponent, data: {titulo: 'Mantenimiento de Usuarios'} },
      { path: 'hospitales', component: HospitalesComponent, data: {titulo: 'Mantenimiento de Hospitales'} },
      { path: 'medicos', component: MedicosComponent, data: {titulo: 'Mantenimiento de Medicos'} },
      { path: 'medico/:id', component: MedicoComponent, data: {titulo: 'Actualizar Medico'} },
      { path: 'medico/nuevo', component: MedicoComponent, data: {titulo: 'Nuevo Medico'} },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: NopagefoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
