import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { MedicoService } from '../../services/medico/medico.service';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Medico } from 'src/app/models/medico.models';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [],
})
export class MedicoComponent implements OnInit {
  // Variables
  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital('', '');
  constructor(
    public medicoService: MedicoService,
    public hospitalService: HospitalService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public modalUpload: ModalUploadService
  ) {
    activatedRoute.params.subscribe((params: any) => {
      // tslint:disable-next-line: no-string-literal
      const id = params['id'];
      if (id !== 'nuevo') {
        this.cargarMedico(id);
      }
    });
  }

  ngOnInit(): void {
    this.hospitalService
      .cargarHospitales()
      .subscribe((hospitales) => (this.hospitales = hospitales));
    this.modalUpload.notificacion.subscribe((resp: any) => {
      // console.log(resp);
      this.medico.img = resp.medico.img;
    });
  }
  guardarMedico(f: NgForm) {
    console.log(f.valid);
    console.log(f.value);
    if (f.invalid) {
      return;
    }
    this.medicoService.guardarMedico(this.medico).subscribe((medico: any) => {
      this.medico._id = medico._id;
      this.router.navigate(['/medico', medico._id]);
    });
  }
  cambioHospital(id: string) {
    // console.log(id);
    this.hospitalService.obtenerHospital(id).subscribe((hospital) => {
      console.log(hospital);
      this.hospital = hospital;
    });
  }
  cargarMedico(id: string) {
    this.medicoService.cargarMedico(id).subscribe((medico: any) => {
      console.log(medico);
      this.medico = medico;
      this.medico.hospitalId = medico.hospitalId._id;
      this.cambioHospital(this.medico.hospitalId);
    });
  }
  cambiarFoto() {
    console.log(this.medico.img);
    this.modalUpload.mostrarModal('medicos', this.medico._id, this.medico.img);
  }
}
