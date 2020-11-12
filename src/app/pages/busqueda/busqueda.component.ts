import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Usuario } from '../../models/usuario.model';
import { Medico } from '../../models/medico.models';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {
  // Variables
  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];

  constructor(public activatedRoute: ActivatedRoute, public http: HttpClient) {
    activatedRoute.params.subscribe(params => {
      // tslint:disable-next-line: no-string-literal
      const termino = params['termino'];
      this.buscar(termino);
    });
   }

  ngOnInit(): void {
  }
  buscar(termino: string){
    const url = `${URL_SERVICIOS}/busqueda/todo/${termino}`;
    this.http.get(url).subscribe( (resp: any) => {
      console.log(resp);
      this.hospitales = resp.hospitales;
      this.usuarios = resp.usuarios;
      this.medicos = resp.medicos;
    });
  }

}
