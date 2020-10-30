import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { SidebarService } from '../../services/shared/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit {
  usuario: Usuario;
  constructor(public usuarioService: UsuarioService, public sideBarService: SidebarService) {}

  ngOnInit(): void {
    this.usuario = this.usuarioService.usuario;
  }
}
