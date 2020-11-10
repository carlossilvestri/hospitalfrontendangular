import { Component, OnInit } from '@angular/core';
import { subscribeOn } from 'rxjs/operators';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  desde = 0;
  totalRegistros = 0;
  cargando = true;
  constructor(public usuarioService: UsuarioService, public modalUploadService: ModalUploadService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.modalUploadService.notificacion.subscribe( (resp) => this.cargarUsuarios());
  }
  cargarUsuarios(){
    this.cargando = true;
    this.usuarioService.cargarUsuario(this.desde)
    .subscribe( (resp: any) => {
      // console.log(resp);
      this.totalRegistros = resp.total;
      this.usuarios = resp.usuarios;
      this.cargando = false;
    });
  }
  cambiarDesde(valor: number){
    const desde = this.desde + valor;
    if (desde >= this.totalRegistros){
      return;
    }
    if (desde < 0 ){
      return;
    }
    this.desde += valor;
    this.cargarUsuarios();
  }
  buscarUsuario(termino: string){
    if (termino.length <= 0){
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;
    this.usuarioService.buscarUsuarios(termino).subscribe( (usuarios: Usuario[]) => {
      this.usuarios = usuarios;
      this.cargando = false;
    });
  }
  borrarUsuario(usuario: Usuario){
    if (usuario._id === this.usuarioService.usuario._id){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se puede borrar a si mismo.'
      });
      return;
    }
    Swal.fire({
      title: '¿Estás seguro/a?',
      text: 'Un usuario borrado no se podra recuperar.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.borrarUsuario(usuario._id)
        .subscribe( (resp: any) => {
          console.log(resp);
          this.cargarUsuarios();
        });
      }
    });

  }
  guardarUsuario(usuario: Usuario){
    Swal.fire({
      title: '¿Estás seguro/a?',
      text: 'Editaras al usuario.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, guardar.',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.actualizarUsuario(usuario).subscribe();
      }
    });
  }
  mostrarModal(id: string, foto: string){
    this.modalUploadService.mostrarModal('usuario', id, foto);
  }
}
