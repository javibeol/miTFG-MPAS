import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mallas',
  templateUrl: './mallas.component.html',
  styleUrls: ['./mallas.component.css']
})
export class MallasComponent {
  
  constructor(private router: Router){}
  
  latitud: string | undefined;
  longitud: string | undefined;

  imageOptions = [{title: 'Imagen 1', description: 'Descripción de la imagen 1', value:'1.92-25', isSelected:'false'}, {title: 'Imagen 2', description: 'Descripción de la imagen 2', value: '2.46-12', isSelected:'false'}, {title: 'Imagen 2', description: 'Descripción de la imagen 2', value: '3.60-15', isSelected:'false'}];
  selectedImage: string = '';

  selectImage(option: string) {
    this.selectedImage = option;
  // 
  }

  goToNextPage() {
    if (this.selectedImage) {
      this.router.navigate(['/otra-url'], { queryParams: { image: this.selectedImage } });
    } else {
      alert('Debes seleccionar una imagen antes de continuar.');
    }
  }
  


}
