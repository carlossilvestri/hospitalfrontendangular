import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css'],
})
export class RegisterComponent implements OnInit {
  forma: FormGroup;
  constructor(public usuariosServies: UsuarioService, public router: Router) {}

  sonIguales(campo1: string, campo2: string) {
    return (group: FormGroup) => {
      const pass1 = group.controls[campo1].value;
      const pass2 = group.controls[campo2].value;
      if (pass1 === pass2) {
        return null;
      }
      return {
        sonIguales: true,
      };
    };
  }

  ngOnInit(): void {
    this.forma = new FormGroup(
      {
        nombre: new FormControl(null, [Validators.required]),
        correo: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required]),
        password2: new FormControl(null, [Validators.required]),
        condiciones: new FormControl(false),
      },
      {
        validators: this.sonIguales('password', 'password2'),
      }
    );
    this.llenarFormulario();
  }
  registrarUsuario(): void {
    if (this.forma.invalid) {
      return;
    }
    if (!this.forma.value.condiciones) {
      Swal.fire({
        icon: 'warning',
        title: 'Atención',
        text: 'Debe de aceptar las condiciones.',
      });
      return;
    }
    console.log('Forma valida: ', this.forma.valid);
    console.log(this.forma.value);
    const usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password
    );
    this.usuariosServies.crearUsuario(usuario).subscribe((resp) => {
      console.log(resp);
      this.router.navigate(['/login']);
    });
  }
  llenarFormulario(): void {
    this.forma.setValue({
      nombre: 'Carlos',
      correo: 'carlos@gmail.com',
      password: '123',
      password2: '1234',
      condiciones: true,
    });
  }
}
