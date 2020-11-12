import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import Swal from 'sweetalert2';
import { of, pipe, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  usuario: Usuario;
  token: string;
  menu: any = [];
  errorMsg = '';
  constructor(
    public http: HttpClient,
    public router: Router,
    public subirArchivoService: SubirArchivoService
  ) {
    // console.log('Servicio de usuario listo');
    this.cargarStorage();
  }
  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));
    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }
  cargarStorage() {
    // console.log(localStorage.getItem('token'));
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }
  login(usuario: Usuario, recordar: boolean = false) {
    const url = `${URL_SERVICIOS}/login`;
    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    return this.http.post(url, usuario)
    .pipe(
      catchError( this.handleError),
      map((resp: any) => {
        console.log(resp);
        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
        return true;
      })
    );

  }
  crearUsuario(usuario: Usuario) {
    const url = `${URL_SERVICIOS}/usuario`;
    return this.http.post(url, usuario).pipe(
      catchError( this.handleError),
      map((resp: any) => {
        Swal.fire('Correcto', 'Usuario creado ' + usuario.email, 'success');
        return resp.usuario;
      })
    );
  }
  actualizarUsuario(usuario: Usuario) {
    let url = `${URL_SERVICIOS}/usuario/${usuario._id}`;
    url += '?token=' + this.token;
    console.log(url);
    console.log(usuario);
    return this.http.put(url, usuario).pipe(
      catchError( this.handleError),
      map((resp: any) => {
        if (usuario._id === this.usuario._id){
          const usuarioDB: Usuario = resp.usuario;
          this.guardarStorage(usuarioDB._id, this.token, usuarioDB, this.menu);
        }
        Swal.fire(
          'Correcto',
          'Usuario actualizado ' + usuario.nombre,
          'success'
        );
        return true;
      })
    );
  }
  loginGoogle(idToken: string) {
    const url = `${URL_SERVICIOS}/google`;
    return this.http.post(url, { idToken }).pipe(
      map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
        console.log(resp);
        return true;
      })
    );
  }
  estaLogueado(): boolean {
    // console.log(this.token);
    return this.token.length > 5 ? true : false;
  }
  logout() {
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
    this.router.navigate(['/login']);
  }
  cambiarImagen(archivo: File, id: string) {
    this.subirArchivoService
      .subirArchivo(archivo, 'usuarios', id, this.token)
      .then((resp: any) => {
        this.usuario.img = resp.usuario.img;
        Swal.fire('Correcto!', 'Imagen actualizada', 'success');
        this.guardarStorage(id, this.token, this.usuario, this.menu);
      })
      .catch((resp) => {
        console.log(resp);
      });
  }
  cargarUsuario(desde: number = 0) {
    const url = `${URL_SERVICIOS}/usuario?desde=${desde}`;
    return this.http.get(url);
  }
  buscarUsuarios(termino: string) {
    const url = `${URL_SERVICIOS}/busqueda/coleccion/usuarios/${termino}`;
    return this.http.get(url).pipe(map( (resp: any) => {
      return resp.usuarios;
    }));
  }
  borrarUsuario(id: string){
    const url = `${URL_SERVICIOS}/usuario/${id}?token=${this.token}`;
    return this.http.delete(url)
            .pipe( map( resp => {
              // console.log(resp);
              Swal.fire(
                '¡Eliminado!',
                'El usuario se ha eliminado correctamente.',
                'success'
              );
              return true;
            }));
  }
   private handleError(error: HttpErrorResponse) {
     console.log(error);
     if (error.error.mensaje){
      Swal.fire({
        icon: 'error',
        title: error.error.mensaje,
        text: error.error.errors ? error.error.errors.message : 'Hubo un error'
      });
     }
     if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
       console.error('An error occurred:', error.error.message);
     } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong.
       console.error(
         `Backend returned code ${error.status}, ` +
         `body was: ${error.error}`);
     }
      // Return an observable with a user-facing error message.
     return throwError(
       'Something bad happened; please try again later.');
   }
  //  handleError(err){
  //    console.log(err);
  //    return throwError(err);
  //  }
}
