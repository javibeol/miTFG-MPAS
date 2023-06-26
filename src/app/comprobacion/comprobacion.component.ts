import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-comprobacion',
  templateUrl: './comprobacion.component.html',
  styleUrls: ['./comprobacion.component.css']
})
export class ComprobacionComponent implements OnInit, AfterViewInit {
  dirMPAS: string | undefined;
  dirWPS: string | undefined;
  dirCasos: string | undefined;
  dirCaso: string | undefined;
  fecha: string | undefined;
  hora: string | undefined;
  duracion: string | undefined;
  dirGEO: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private http: HttpClient) { }

ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.dirMPAS = params['dirMPAS'];
      this.dirWPS = params['dirWPS'];
      this.dirCasos = params['dirCasos'];
      this.dirCaso = params['dirCaso'];
      this.fecha = params['fecha'];
      this.hora = params['hora'];
      this.duracion = params['duracion'];
      this.dirGEO = params['dirGEO'];

      // Llama a las funciones que generan las URLs
      this.generateDownloadLink1();
    });
}

ngAfterViewInit() {
  window.scrollTo(0, 0); // Ajusta la posición del scroll a la parte superior
}

//archivo create_a_new_MPAS_case.sh
generateDownloadLink1(): void {
  const fileName1 = 'create_a_new_MPAS_case.sh';
  const dirMPAS = this.dirMPAS; 

  const fileContent1 = `#!/bin/bash

#1. Create a run directory (name of directory to be created as parameter)
    
if [ $# -ne 1 ]
  then
      echo "Sintaxis create_new_MPAS_case.sh directory_test"
      exit 1
fi
    
mkdir $1
    
cd $1
    
#2. Link the init atmosphere model and atmosphere model executables to the run directory, as well as physics lookup tables (src/core atmosphere/physics/physics wrf/files/*).
#3. Copy the namelist.*, streams.*, and stream list.* files to the run directory.
    
MPDIR=${dirMPAS}
    
#linking executables 
ln -s \${MPDIR}/atmosphere_model atmosphere_model
ln -s \${MPDIR}/build_tables build_tables
ln -s \${MPDIR}/init_atmosphere_model init_atmosphere_model
    
#Linking tables
MPDIR_T=\${MPDIR}/src/core_atmosphere/physics/physics_wrf/files
ln -s \${MPDIR_T}/CAM_ABS_DATA.DBL CAM_ABS_DATA.DBL
ln -s \${MPDIR_T}/CAM_AEROPT_DATA.DBL CAM_AEROPT_DATA.DBL
ln -s \${MPDIR_T}/COMPATIBILITY COMPATIBILITY
ln -s \${MPDIR_T}/GENPARM.TBL GENPARM.TBL
ln -s \${MPDIR_T}/LANDUSE.TBL LANDUSE.TBL
ln -s \${MPDIR_T}/OZONE_DAT.TBL OZONE_DAT.TBL
ln -s \${MPDIR_T}/OZONE_LAT.TBL OZONE_LAT.TBL
ln -s \${MPDIR_T}/OZONE_PLEV.TBL OZONE_PLEV.TBL
ln -s \${MPDIR_T}/RRTMG_LW_DATA RRTMG_LW_DATA
ln -s \${MPDIR_T}/RRTMG_LW_DATA.DBL RRTMG_LW_DATA.DBL
ln -s \${MPDIR_T}/RRTMG_SW_DATA RRTMG_SW_DATA
ln -s \${MPDIR_T}/RRTMG_SW_DATA.DBL RRTMG_SW_DATA.DBL
ln -s \${MPDIR_T}/SOILPARM.TBL SOILPARM.TBL
ln -s \${MPDIR_T}/VEGPARM.TBL VEGPARM.TBL
ln -s \${MPDIR_T}/VERSION VERSION
    
#Copying namelist, stream and streams_list files
    
cp \${MPDIR}/namelist.atmosphere .
cp \${MPDIR}/namelist.init_atmosphere .
cp \${MPDIR}/stream_list.atmosphere.diagnostics .
cp \${MPDIR}/stream_list.atmosphere.output .
cp \${MPDIR}/stream_list.atmosphere.surface .
cp \${MPDIR}/streams.atmosphere .
cp \${MPDIR}/streams.init_atmosphere .
    
cd ..`;
  
  /* const data = new Blob([fileContent1], { type: 'text/plain' });
  const url = window.URL.createObjectURL(data);
  
  return url */;

  // envía una solicitud al servidor para guardar el archivo
  this.http.post('http://localhost:3000/saveFile', {
    fileName: fileName1,
    content: fileContent1
  }).subscribe(
    response => console.log('Respuesta del servidor: ', response),
    error => console.error('Error del servidor: ', error)
  );

  /* const data = new Blob([fileContent1], { type: 'text/plain' });
  this.downloadLink1 = window.URL.createObjectURL(data); */
}

goToMallas(): void {
  // parámetros y luego redirigir a /mallas
  this.router.navigate(['/mallas'], { queryParams: this.route.snapshot.queryParams });
}

goBack() {
  this.location.back();
}
  

}

