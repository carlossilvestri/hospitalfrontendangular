import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen',
})
export class ImagenPipe implements PipeTransform {
  transform(img: string, tipo: string = 'usuario'): any {
    let url = `${URL_SERVICIOS}/upload`;
    // console.log(tipo);
    if (!img) {
      return url + '/usuarios/xxx'; // Trae el no-image del servidor.
    }
    // Si viene una imagen de google
    if (img.indexOf('https') >= 0) {
      return img;
    }
    switch (tipo) {
      case 'usuario':
        url += '/usuarios/' + img;
        break;
      case 'medico':
        url += '/medicos/' + img;
        break;
      case 'medicos':
          url += '/medicos/' + img;
          break;
      case 'hospital':
        url += '/hospitales/' + img;
        break;
      default:
        console.log('tipo de imagen no existe, usuario, medico, hospital');
        url += '/usuarios/xxx';
        break;
    }
    console.log('En el pipe');
    console.log(url);
    return url;
  }
}
