import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import Swal from 'sweetalert2';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  usuario: Usuario;
  token: string;
  constructor(
    public http: HttpClient,
    public router: Router,
    public subirArchivoService: SubirArchivoService
  ) {
    // console.log('Servicio de usuario listo');
    this.cargarStorage();
  }
  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuario = usuario;
    this.token = token;
  }
  cargarStorage() {
    // console.log(localStorage.getItem('token'));
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }
  login(usuario: Usuario, recordar: boolean = false) {
    const url = `${URL_SERVICIOS}/login`;
    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        // console.log('login ', resp.token);
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
      })
    );
  }
  crearUsuario(usuario: Usuario) {
    const url = `${URL_SERVICIOS}/usuario`;
    return this.http.post(url, usuario).pipe(
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
      map((resp: any) => {
        if (usuario._id === this.usuario._id){
          const usuarioDB: Usuario = resp.usuario;
          this.guardarStorage(usuarioDB._id, this.token, usuarioDB);
        }
        // Swal.fire(
        //   'Correcto',
        //   'Usuario actualizado ' + usuario.nombre,
        //   'success'
        // );
        return true;
      })
    );
  }
  loginGoogle(idToken: string) {
    const url = `${URL_SERVICIOS}/google`;
    return this.http.post(url, { idToken }).pipe(
      map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);
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
    this.router.navigate(['/login']);
  }
  cambiarImagen(archivo: File, id: string) {
    this.subirArchivoService
      .subirArchivo(archivo, 'usuarios', id, this.token)
      .then((resp: any) => {
        this.usuario.img = resp.usuario.img;
        Swal.fire('Correcto!', 'Imagen actualizada', 'success');
        this.guardarStorage(id, this.token, this.usuario);
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
}
