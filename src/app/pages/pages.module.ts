
import { NgModule } from '@angular/core';
// import { PAGES_ROUTES } from './pages.routes';

import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// ng2-charts
import { ChartsModule } from 'ng2-charts';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
// Pipe Module
import { PipesModule } from '../pipes/pipes.module';

import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';

@NgModule({
    declarations: [
        AccoutSettingsComponent,
        DashboardComponent,
        Graficas1Component,
        ProfileComponent,
        ProgressComponent,
        PromesasComponent,
        RxjsComponent,
        PagesComponent,
        IncrementadorComponent,
        GraficoDonaComponent,
        UsuariosComponent,
        ModalUploadComponent,
        HospitalesComponent,
        MedicosComponent,
        MedicoComponent,
    ],
    exports: [
        AccoutSettingsComponent,
        DashboardComponent,
        Graficas1Component,
        ProfileComponent,
        ProgressComponent,
        PromesasComponent,
        RxjsComponent,
        PagesComponent,
        IncrementadorComponent,
        GraficoDonaComponent,
        UsuariosComponent,
        ModalUploadComponent,
        HospitalesComponent,
    ],
    imports: [
        BrowserModule,
        CommonModule,
        AppRoutingModule,
        SharedModule,
        FormsModule,
        PipesModule,
        ChartsModule
    ]
})
export class PagesModule { }
