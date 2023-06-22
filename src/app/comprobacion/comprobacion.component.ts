import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-comprobacion',
  templateUrl: './comprobacion.component.html',
  styleUrls: ['./comprobacion.component.css']
})
export class ComprobacionComponent implements OnInit {
  dirMPAS: string | undefined;
  dirWPS: string | undefined;
  dirCasos: string | undefined;
  dirCaso: string | undefined;
  fecha: string | undefined;
  hora: string | undefined;
  duracion: string | undefined;
  dirGEO: string | undefined;

  downloadLink1: string | undefined;
  downloadLink2: string | undefined;

  constructor(private route: ActivatedRoute, private router: Router, private location: Location) { }

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
      this.generateDownloadLink2();
    });
  }

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
    
#MPDIR=\${HOME}/entorno/instaladores/MPAS-Model-7.0
MPDIR=\${HOME}${dirMPAS}
    
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

  const data = new Blob([fileContent1], { type: 'text/plain' });
  this.downloadLink1 = window.URL.createObjectURL(data);
}

generateDownloadLink2(): string {
  const fileName2 = 'namelist.init_atmosphere';
  const dirGEO = this.dirGEO; 

  const fileContent2 = `&nhyd_model
  config_init_case = 7
  config_start_time = '2010-10-23_00:00:00'
  config_stop_time = '2010-10-23_00:00:00'
  config_theta_adv_order = 3
  config_coef_3rd_order = 0.25
/
&dimensions
  config_nvertlevels = 55
  config_nsoillevels = 4
  config_nfglevels = 38
  config_nfgsoillevels = 4
/
&data_sources
  config_geog_data_path = '${dirGEO}'
  config_met_prefix = 'CFSR'
  config_sfc_prefix = 'SST'
  config_fg_interval = 86400
  config_landuse_data = 'MODIFIED_IGBP_MODIS_NOAH'
  config_topo_data = 'GMTED2010'
  config_vegfrac_data = 'MODIS'
  config_albedo_data = 'MODIS'
  config_maxsnowalbedo_data = 'MODIS'
  config_supersample_factor = 3
  config_use_spechumd = false
/
&vertical_grid
  config_ztop = 30000.0
  config_nsmterrain = 1
  config_smooth_surfaces = true
  config_dzmin = 0.3
  config_nsm = 30
  config_tc_vertical_grid = true
  config_blend_bdy_terrain = false
/
&interpolation_control
  config_extrap_airtemp = 'linear'
/
&preproc_stages
  config_static_interp = true
  config_native_gwd_static = true
  config_vertical_grid = true
  config_met_interp = true
  config_input_sst = false
  config_frac_seaice = true
/
&io
  config_pio_num_iotasks = 0
  config_pio_stride = 1
/
&decomposition
  config_block_decomp_file_prefix = 'x1.40962.graph.info.part.'
/`;
  
  const data = new Blob([fileContent2], { type: 'text/plain' });
  const url = window.URL.createObjectURL(data);
  
  return url;
}

goToMallas(): void {
  // Aquí puedes hacer lo que necesites con los parámetros y luego redirigir a /mallas
  this.router.navigate(['/mallas'], { queryParams: this.route.snapshot.queryParams });
}

goBack() {
  this.location.back();
}
  

}

