import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/hospital/hospital.service';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit {
  // Variables
  hospitales: Hospital[] = [];
  cargando = true;
  constructor(public hospitalService: HospitalService, public modalUploadService: ModalUploadService) { }

  ngOnInit(): void {
    this.cargarHospitales();
    this.modalUploadService.notificacion.subscribe( () => this.cargarHospitales());
  }
  cargarHospitales(desde: number = 0){
    this.cargando = true;
    this.hospitalService.cargarHospitales(desde)
    .subscribe( hospitales => {
      this.hospitales = hospitales;
      this.cargando = false;
    });
  }
  buscarHospital(termino: string){
    if (termino.length <= 0){
      this.cargarHospitales();
      return;
    }
    this.cargando = true;
    this.hospitalService.buscarHospital(termino).subscribe( hospitales => {
      this.hospitales = hospitales;
      this.cargando = false;
    });
  }
  guardarHospital(hospital: Hospital){
    Swal.fire({
      title: '¿Estás seguro/a?',
      text: 'Editarás el hospital.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, guardar.',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.hospitalService.actualizarHospital(hospital)
        .subscribe();
      }
    });
  }

  borrarHospital(hospital: Hospital){
    Swal.fire({
      title: '¿Estás seguro/a?',
      text: 'Un hospital borrado no se podrá recuperar.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.hospitalService.borrarHospital(hospital._id).subscribe( () => { this.cargarHospitales(); });
      }
    });
  }
  async crearHospital(){
    const { value: dato } = await Swal.fire({
      title: '¿Cómo se llama el hospital?',
      input: 'text',
      inputLabel: 'Nombre del Hospital',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Debes escribir algo.';
        }
      }
    });
    if (dato.length < 4){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El nombre del hospital es muy corto.'
      });
      return;
    }
    if (dato) {
      this.hospitalService.crearHospital(dato)
      .subscribe( () => this.cargarHospitales());
    }
  }
  actualizarImagen(hospital: Hospital){
    this.modalUploadService.mostrarModal('hospital', hospital._id, hospital.img);
  }
}
