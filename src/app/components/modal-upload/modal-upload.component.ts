import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';
import { UsuarioService } from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: [],
})
export class ModalUploadComponent implements OnInit {
  imagenSubir: File;
  imagenTemp: string;

  constructor(
    public subirArchivoService: SubirArchivoService,
    public modalUploadService: ModalUploadService,
    public usuarioService: UsuarioService
  ) {
    console.log('Modal listo');
  }
  ngOnInit(): void {}
  cerrarModal() {
    this.imagenTemp = null;
    this.imagenSubir = null;
    this.modalUploadService.ocultarModal();
  }
  subirImagen() {
    this.subirArchivoService
      .subirArchivo(
        this.imagenSubir,
        this.modalUploadService.tipo,
        this.modalUploadService.id,
        this.usuarioService.token
      )
      .then((resp: any) => {
        console.log(resp);
        this.modalUploadService.notificacion.emit(resp);
        this.cerrarModal();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  seleccionImage(archivo: File) {
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }
    // Si el archivo no es una img entonces:
    if (archivo.type.indexOf('image') < 0) {
      Swal.fire({
        icon: 'error',
        title: 'Sólo imágenes',
        text: 'El archivo seleccionado no es una imagen',
      });
      this.imagenSubir = null;
      return;
    }
    // El archivo es una imagen.
    this.imagenSubir = archivo;

    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => (this.imagenTemp = reader.result.toString());
  }
}
