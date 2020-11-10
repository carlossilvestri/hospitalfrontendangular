import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { Medico } from 'src/app/models/medico.models';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class MedicoService {
  // Variables
  totalMedicos = 0;
  constructor(public http: HttpClient, public usuarioService: UsuarioService) {}
  cargarMedicos(desde: number = 0) {
    const url = `${URL_SERVICIOS}/medico?desde=${desde}`;
    return this.http.get(url).pipe(
      map((resp: any) => {
        this.totalMedicos = resp.total;
        return resp.medicos;
      })
    );
  }
  guardarMedico(medico: Medico) {
    const urlCrearMedico = `${URL_SERVICIOS}/medico?token=${this.usuarioService.token}`;
    if (medico._id) {
      const urlModificarMedico = `${URL_SERVICIOS}/medico/${medico._id}/?token=${this.usuarioService.token}`;
      // Actualizando info del medico
      return this.http.put(urlModificarMedico, medico).pipe(
        map((resp: any) => {
          Swal.fire(
            'Correcto',
            'El medico: ' + medico.nombre + ' se ha guardado.',
            'success'
          );
          return resp.medico;
        })
      );
    }else{
      // Creando un nuevo medico.
      return this.http.post(urlCrearMedico, medico).pipe(
        map((resp: any) => {
          Swal.fire(
            'Correcto',
            'El medico: ' + medico.nombre + ' ha sido creado.',
            'success'
          );
          return resp.medico;
        })
      );
    }
  }
  buscarMedico(termino: string) {
    const url = `${URL_SERVICIOS}/busqueda/coleccion/medicos/${termino}`;
    return this.http.get(url).pipe(
      map((resp: any) => {
        return resp.medicos;
      })
    );
  }
  borrarMedico(id: string) {
    const url = `${URL_SERVICIOS}/medico/${id}?token=${this.usuarioService.token}`;
    return this.http.delete(url).pipe(
      map((resp) => {
        // console.log(resp);
        Swal.fire(
          '¡Eliminado!',
          'El medico se ha eliminado correctamente.',
          'success'
        );
        return true;
      })
    );
  }
  cargarMedico(id: string) {
    const url = `${URL_SERVICIOS}/medico/${id}`;
    return this.http.get(url).pipe(
      map((resp: any) => {
        return resp.medico;
      })
    );
  }
}
