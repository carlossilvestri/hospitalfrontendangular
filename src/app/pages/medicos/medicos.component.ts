import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MedicoService } from '../../services/medico/medico.service';
import { Medico } from '../../models/medico.models';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit {
  // Variables
  cargando = true;
  medicos: Medico[] = [];
  constructor(
    public router: Router,
    public medicoService: MedicoService,
    public modalUploadService: ModalUploadService
    ) { }

  ngOnInit(): void {
    this.cargarMedicos();
  }
  crearMedico(){
    this.router.navigate(['/medico/nuevo']);
  }
  buscarMedico(termino: string){
    if (termino.length <= 0){
      this.cargarMedicos();
      return;
    }
    this.medicoService.buscarMedico(termino).subscribe( (medicos) => {
      this.medicos = medicos;
    });
  }
  cargarMedicos(desde: number = 0){
    this.cargando = true;
    this.medicoService.cargarMedicos(desde)
    .subscribe( medicos => {
      this.medicos = medicos;
      this.cargando = false;
    });
  }
  actualizarImagen(medico: Medico){
    this.modalUploadService.mostrarModal('medico', medico._id, medico.img);
  }
  editarMedico(medico: Medico){
    this.router.navigate([`/medico/${medico._id}`]);
  }
  borrarMedico(medico: Medico, index: number){
    Swal.fire({
      title: '¿Estás seguro/a?',
      text: 'Un medico eliminado no se podrá recuperar.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicoService.borrarMedico(medico._id).subscribe( () => { this.medicos.splice(index, 1); this.medicoService.totalMedicos--; });
      }
    });
  }
}
