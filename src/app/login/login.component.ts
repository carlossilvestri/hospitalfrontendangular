import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  recuerdame = false;
  email: string;
  auth2: any;
  constructor(public usuariosServies: UsuarioService, public router: Router) {}

  ngOnInit(): void {
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) {
      this.recuerdame = true;
    }
  }
  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id:
          '252405004479-fqgr9rietf49batm75ktq8porrspphcp.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email',
      });
      this.attachSignin(document.getElementById('btnGoogle'));
    });
  }
  attachSignin(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      // const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;
      console.log(token);
      this.usuariosServies.loginGoogle(token).subscribe((resp) => {
        console.log(resp);
        window.location.href = '/dashboard';
      });
    });
  }
  ingresar(forma: NgForm) {
    if (forma.invalid) {
      return;
    }
    const usuario = new Usuario(null, forma.value.email, forma.value.password);
    this.usuariosServies
      .login(usuario, forma.value.recuerdame)
      .subscribe((correcto) => {
        console.log(correcto);
        window.location.href = '/dashboard';
      });
    console.log(forma.value);
  }
}
