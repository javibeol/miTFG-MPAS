import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MallaService } from './malla.service';

@Component({
  selector: 'app-mallas',
  templateUrl: './mallas.component.html',
  styleUrls: ['./mallas.component.css']
})
export class MallasComponent implements OnInit{
  selectedUniformeMesh: string = '';
  selectedMesh: string = '';
  
  latitud: string | undefined;
  longitud: string | undefined;
  
  constructor(private router: Router, private mallaService: MallaService){}
  
  ngOnInit() {
    this.selectedUniformeMesh = this.mallaService.getSelectedUniformeMesh();
    this.selectedMesh = this.mallaService.getSelectedMesh();
  }

  selectImage(option: string) {
    this.selectedMesh = option;
    this.mallaService.setSelectedMesh(option);
  }

  goToNextPageUniforme() {
    if (this.selectedUniformeMesh) {
      const selectedLabel = (<HTMLInputElement>document.querySelector('input[name="mesh-U"]:checked')).getAttribute('data-label');
      const queryParams = {
        nombre: this.selectedMesh,
        label: selectedLabel,
        latitud: 0,
        longitud: 0
      };
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
      const selectedLabel = (<HTMLInputElement>document.querySelector('input[name="mesh"]:checked')).getAttribute('data-label');
      const imageSrc = (<HTMLImageElement>document.querySelector('input[name="mesh"]:checked + .form-check-label img')).src;
      const queryParams = {
        nombre: this.selectedMesh,
        label: selectedLabel,
        src: imageSrc,
        latitud: this.latitud,
        longitud: this.longitud
      };
      this.router.navigate(['/next'], { queryParams: queryParams });
    }
  }
  
  
}
