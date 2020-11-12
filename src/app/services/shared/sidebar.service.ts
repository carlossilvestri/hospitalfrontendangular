import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: any = [];
  // menu: any = [
  //   {
  //     titulo: 'Principal',
  //     icono: 'md mdi-gauge',
  //     submenu: [
  //       { titulo: 'Dashboard', url: '/dashboard'},
  //       { titulo: 'ProgressBar', url: '/progress'},
  //       { titulo: 'Gráficas', url: '/graficas1'},
  //       { titulo: 'Promesas', url: '/promesas'},
  //       { titulo: 'RxJs', url: '/rxjs'},
  //     ]
  //   },
  //   {
  //     titulo: 'Mantenimiento',
  //     icono: 'md mdi-folder-lock-open',
  //     submenu: [
  //       { titulo: 'Usuarios', url: '/usuarios'},
  //       { titulo: 'Hospitales', url: '/hospitales'},
  //       { titulo: 'Médicos', url: '/medicos'}
  //     ]
  //   }
  // ];

  constructor(public usuarioService: UsuarioService) {
    this.menu = this.usuarioService.menu;
  }
  cargarMenu(){
    this.menu = this.usuarioService.menu;
  }
}
