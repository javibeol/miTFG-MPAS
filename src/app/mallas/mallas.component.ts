import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MallaService } from './malla.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-mallas',
  templateUrl: './mallas.component.html',
  styleUrls: ['./mallas.component.css']
})
export class MallasComponent implements OnInit, AfterViewInit{
  selectedUniformeMesh: string = '';
  selectedMesh: string = '';
  
  latitud: string | null | undefined;
  longitud: string | null | undefined;

  //parámetros que vienen de comprobacion
  dirMPAS: string | undefined;
  dirWPS: string | undefined;
  dirCasos: string | undefined;
  dirCaso: string | undefined;
  fecha: string | undefined;
  hora: string | undefined;
  duracion: string | undefined;
  dirGEO: string | undefined;

  latitudMin: number = -90;
  latitudMax: number = 90;
  longitudMin: number = -180;
  longitudMax: number = 180;
  latitudErrorMessage: string = 'El valor debe estar entre el rango de -90 a 90';
  longitudErrorMessage: string = 'El valor debe estar entre el rango de -180 a 180';
  
  constructor(private router: Router, private mallaService: MallaService, private route: ActivatedRoute, private location: Location){}
  
ngOnInit() {
    this.selectedUniformeMesh = this.mallaService.getSelectedUniformeMesh();
    this.selectedMesh = this.mallaService.getSelectedMesh();
    this.latitud = this.mallaService.getLatitud();
    this.longitud = this.mallaService.getLongitud();

    // Suscribo a queryParams para guardar los parámetros en las propiedades del componente
    this.route.queryParams.subscribe(params => {
      this.dirMPAS = params['dirMPAS'];
      this.dirWPS = params['dirWPS'];
      this.dirCasos = params['dirCasos'];
      this.dirCaso = params['dirCaso'];
      this.fecha = params['fecha'];
      this.hora = params['hora'];
      this.duracion = params['duracion'];
      this.dirGEO = params['dirGEO'];
    });
}

ngAfterViewInit() {
  window.scrollTo(0, 0); // Ajusta la posición del scroll a la parte superior
}

selectImage(option: string) {
    this.selectedMesh = option;
    this.mallaService.setSelectedMesh(option);
  }

goToNextPageUniforme() {
    if (this.selectedUniformeMesh) {
      const selectedLabel = (<HTMLInputElement>document.querySelector('input[name="mesh-U"]:checked')).getAttribute('data-label');
      const queryParams = {
        nombre: this.selectedUniformeMesh,
        label: selectedLabel,
        latitud: 0,
        longitud: 0,

        //parámetros que vienen de comprobacion
        dirMPAS: this.dirMPAS,
        dirWPS: this.dirWPS,
        dirCasos: this.dirCasos,
        dirCaso: this.dirCaso,
        fecha: this.fecha,
        hora: this.hora,
        duracion: this.duracion,
        dirGEO: this.dirGEO
      };
      this.mallaService.setSelectedUniformeMesh(this.selectedUniformeMesh);
      this.mallaService.setLatitud("0");
      this.mallaService.setLongitud("0");
      this.router.navigate(['/next'], { queryParams: queryParams });
      //this.router.navigate(['/next'], { queryParams: { nombre: this.selectedUniformeMesh } });
    } else {
      alert('Debes seleccionar una malla uniforme antes de continuar.');
    }
  }

goToNextPage() {
    if (!this.selectedMesh) {
      alert('Debes seleccionar una malla variable antes de continuar.');
    } else if (!this.latitud) {
      alert('Debes ingresar la latitud antes de continuar.');
    } else if (!this.longitud) {
      alert('Debes ingresar la longitud antes de continuar.');
    } else {
      this.validateLatitud();
        this.validateLongitud();
        
        if (this.latitudErrorMessage) {
            alert(this.latitudErrorMessage);
            return;
        }

        if (this.longitudErrorMessage) {
            alert(this.longitudErrorMessage);
            return;
        }
      const selectedLabel = (<HTMLInputElement>document.querySelector('input[name="mesh"]:checked')).getAttribute('data-label');
      const imageSrc = (<HTMLImageElement>document.querySelector('input[name="mesh"]:checked + .form-check-label img')).src;
      const queryParams = {
        nombre: this.selectedMesh,
        label: selectedLabel,
        src: imageSrc,
        latitud: this.latitud,
        longitud: this.longitud,

        //parámetros que vienen de comprobacion
        dirMPAS: this.dirMPAS,
        dirWPS: this.dirWPS,
        dirCasos: this.dirCasos,
        dirCaso: this.dirCaso,
        fecha: this.fecha,
        hora: this.hora,
        duracion: this.duracion,
        dirGEO: this.dirGEO
      };
      this.mallaService.setSelectedMesh(this.selectedMesh);
      this.mallaService.setLatitud(this.latitud);
      this.mallaService.setLongitud(this.longitud);
      this.router.navigate(['/next'], { queryParams: queryParams });
    }
  }


validateLatitud() {
  const latitud = Number(this.latitud);
  if (isNaN(latitud) || latitud < this.latitudMin || latitud > this.latitudMax) {
    this.latitudErrorMessage = 'La latitud debe estar en el rango de -90 a 90.';
  } else {
    this.latitudErrorMessage = '';
  }
}

validateLongitud() {
  const longitud = Number(this.longitud);
  if (isNaN(longitud) || longitud < this.longitudMin || longitud > this.longitudMax) {
    this.longitudErrorMessage = 'La longitud debe estar en el rango de -180 a 180.';
  } else {
    this.longitudErrorMessage = '';
  }
}

goBack() {
  this.location.back();
}

}
