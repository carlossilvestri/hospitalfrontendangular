import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {
  public tipo: string;
  public id: string;
  public oculto = 'oculto';
  public foto = '';
  public notificacion = new EventEmitter<any>();
  constructor() {
  }
  ocultarModal(){
    this.oculto = 'oculto';
    this.tipo = null;
    this.id = null;
  }
  mostrarModal(tipo: string, id: string, foto: string){
    this.oculto = '';
    this.tipo = tipo;
    this.id = id;
    this.foto = foto;
  }
}
