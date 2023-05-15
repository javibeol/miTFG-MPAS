import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-next-page',
  templateUrl: './next-page.component.html',
  styleUrls: ['./next-page.component.css']
})

export class NextPageComponent implements OnInit{
  nombre: string | null = null;
  latitud: string | null = null;
  longitud: string | null = null;
  label: string | null = null;
  src: string | null = null;

constructor(private route: ActivatedRoute) {}

ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.nombre = params['nombre'] || null;
      this.latitud = params['latitud'] || null;
      this.longitud = params['longitud'] || null;
      this.label = params['label'] || null;
      this.src = params['src'] ? this.extractRelativePath(params['src']) : null;
    });
  }

  private extractRelativePath(url: string): string {
    const startIndex = url.indexOf('assets/');
    if (startIndex !== -1) {
      return url.substring(startIndex);
    }
    return url;
  }

  generateDownloadLink1(): string {
    const fileName1 = 'namelist.input';
    const latitud = this.latitud || '0'; 
    const longitud = this.longitud || '0';  

    const fileContent1 = `&input
    config_original_latitude_degrees = 0
    config_original_longitude_degrees = 0
  
    config_new_latitude_degrees = ${latitud}
    config_new_longitude_degrees = ${longitud}
    config_birdseye_rotation_counter_clockwise_degrees = 0
  /`;
  
    const data = new Blob([fileContent1], { type: 'text/plain' });
    const url = window.URL.createObjectURL(data);
  
    return url;
  }
  
  generateDownloadLink2(): string {
    const fileName2 = 'archivo2.txt';
    const fileContent2 = 'Contenido del archivo 2';
  
    const data = new Blob([fileContent2], { type: 'text/plain' });
    const url = window.URL.createObjectURL(data);
  
    return url;
  }
  
  generateDownloadLink3(): string {
    const fileName3 = 'archivo3.txt';
    const fileContent3 = 'Contenido del archivo 3';
  
    const data = new Blob([fileContent3], { type: 'text/plain' });
    const url = window.URL.createObjectURL(data);
  
    return url;
  }
  
  
}
