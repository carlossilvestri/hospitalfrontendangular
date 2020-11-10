import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from 'sweetalert2';
import { Hospital } from '../../models/hospital.model';
@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  // Variables:
  totalHospitales = 0;
  constructor(public http: HttpClient, public usuarioService: UsuarioService) { }
  cargarHospitales(desde: number = 0){
    const url = `${URL_SERVICIOS}/hospital?desde=${desde}`;
    return this.http.get(url)
    .pipe(
      map( (resp: any) => {
        // console.log(resp);
        this.totalHospitales = resp.total;
        return resp.hospitales;
      })
    );
  }
  obtenerHospital(id: string){
    const url = `${URL_SERVICIOS}/hospital/${ id }`;
    return this.http.get(url)
    .pipe(
      map( (resp: any) => {
        console.log(resp);
        return resp.hospital;
      })
    );
  }
  borrarHospital(id: string){
    const url = `${URL_SERVICIOS}/hospital/${ id }?token=${ this.usuarioService.token }`;
    return this.http.delete(url)
    .pipe(
      map( (resp: any) => {
        Swal.fire('Correcto', 'Hospital borrado correctamente.', 'success');
      })
    );
  }
  crearHospital(nombre: string){
    const url = `${URL_SERVICIOS}/hospital?token=${ this.usuarioService.token }`;
    return this.http.post(url, { nombre })
      .pipe(
        map( (resp: any) => {
          Swal.fire('Correcto', `Se ha creado el hospital ${nombre}.`, 'success');
          return resp.hospital;
        })
      );
  }
  buscarHospital(termino: string) {
    const url = `${URL_SERVICIOS}/busqueda/coleccion/hospitales/${termino}`;
    return this.http.get(url).pipe(map( (resp: any) => {
      return resp.hospitales;
    }));
  }
  actualizarHospital(hospital: Hospital){
    const url = `${URL_SERVICIOS}/hospital/${hospital._id}?token=${ this.usuarioService.token }`;
    return this.http.put(url, hospital)
        .pipe(
          map( (resp: any) => {
            Swal.fire('Correcto', 'Hospital editado correctamente.', 'success');
            return resp.hospital;
          })
        );
  }
}
