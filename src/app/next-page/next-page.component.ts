import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';


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

  //parámetros que vienen de comprobacion
  dirMPAS: string | undefined;
  dirWPS: string | undefined;
  dirCasos: string | undefined;
  dirCaso: string | undefined;
  fecha: string | undefined;
  hora: string | undefined;
  duracion: string | undefined;
  dirGEO: string | undefined;

constructor(private route: ActivatedRoute, private location: Location) {}

ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.nombre = params['nombre'] || null;
      this.latitud = params['latitud'] || null;
      this.longitud = params['longitud'] || null;
      this.label = params['label'] || null;
      this.src = params['src'] ? this.extractRelativePath(params['src']) : null;
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

//Este es si rota
generateDownloadLink2(): string {
  const fileName2 = 'streams.init_atmosphere';
  const nombre = this.nombre;

  const fileContent2 = `<streams>
<immutable_stream name="input"
                  type="input"
                  filename_template="${nombre}.grid_out.nc"
                  input_interval="initial_only" />
  
<immutable_stream name="output"
                  type="output"
                  filename_template="${nombre}.init.nc"
                  packages="initial_conds"
                  output_interval="initial_only" />
  
<immutable_stream name="surface"
                  type="output"
                  filename_template="${nombre}.sfc_update.nc"
                  filename_interval="none"
                  packages="sfc_update"
                  output_interval="86400" />
  
<immutable_stream name="lbc"
                  type="output"
                  filename_template="lbc.$Y-$M-$D_$h.$m.$s.nc"
                  filename_interval="output_interval"
                  packages="lbcs"
                  output_interval="3:00:00" />
  
</streams>`

  const data = new Blob([fileContent2], { type: 'text/plain' });
  const url = window.URL.createObjectURL(data);
  
  return url;
}

//si no rota
generateDownloadLink3(): string {
  const fileName3 = 'streams.init_atmosphere';
  const nombre = this.nombre;

  const fileContent3 = `<streams>
<immutable_stream name="input"
                  type="input"
                  filename_template="${nombre}.grid.nc"
                  input_interval="initial_only" />
    
<immutable_stream name="output"
                  type="output"
                  filename_template="${nombre}.init.nc"
                  packages="initial_conds"
                  output_interval="initial_only" />
    
<immutable_stream name="surface"
                  type="output"
                  filename_template="${nombre}.sfc_update.nc"
                  filename_interval="none"
                  packages="sfc_update"
                  output_interval="86400" />
    
<immutable_stream name="lbc"
                  type="output"
                  filename_template="lbc.$Y-$M-$D_$h.$m.$s.nc"
                  filename_interval="output_interval"
                  packages="lbcs"
                  output_interval="3:00:00" />
    
</streams>`

  const data = new Blob([fileContent3], { type: 'text/plain' });
  const url = window.URL.createObjectURL(data);
  
  return url;
}

goBack() {
  this.location.back();
}
  
  
}
