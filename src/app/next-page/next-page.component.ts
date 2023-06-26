import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-next-page',
  templateUrl: './next-page.component.html',
  styleUrls: ['./next-page.component.css']
})

export class NextPageComponent implements OnInit, AfterViewInit{
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
  fecha2: string | undefined;
  hora: string | undefined;
  duracion: string | undefined;
  dirGEO: string | undefined;

constructor(private route: ActivatedRoute,
  private router: Router, 
  private location: Location, 
  private http: HttpClient) {}

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
      this.fecha2 = this.fecha?.replace(/-/g,"");
      this.hora = params['hora'];
      this.duracion = params['duracion'];
      this.dirGEO = params['dirGEO'];

      // Llama a las funciones que generan las URLs
      if (this.src) {
        // Si 'this.src' no es nulo (VARIABLE), llama a 'this.generateDownloadLink2()'
        this.generateDownloadLink1();
        this.generateDownloadLink2();
      } else {
        // Si 'this.src' es nulo (UNIFORME), llama a 'this.generateDownloadLink3()'
        this.generateDownloadLink3();
      }
    });
    //namelist.init_atmosphere
    this.generateDownloadLink4();
    this.generateDownloadLink5();
    this.generateDownloadLink6();
    this.generateDownloadLink7();
}

ngAfterViewInit() {
  window.scrollTo(0, 0); // Ajusta la posición del scroll a la parte superior
}

private extractRelativePath(url: string): string {
    const startIndex = url.indexOf('assets/');
    if (startIndex !== -1) {
      return url.substring(startIndex);
    }
    return url;
}

generateDownloadLink1(): void {
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
  
  this.http.post('http://localhost:3000/saveFile', {
    fileName: fileName1,
    content: fileContent1
  }).subscribe(
    response => console.log('Respuesta del servidor: ', response),
    error => console.error('Error del servidor: ', error)
  );
}

//Este es si rota (MALLA VARIABLE)
generateDownloadLink2(): void {
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

this.http.post('http://localhost:3000/saveFile', {
  fileName: fileName2,
  content: fileContent2
}).subscribe(
  response => console.log('Respuesta del servidor: ', response),
  error => console.error('Error del servidor: ', error)
);

}


//si no rota (MALLA UNIFORME)
generateDownloadLink3(): void {
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

this.http.post('http://localhost:3000/saveFile', {
  fileName: fileName3,
  content: fileContent3
}).subscribe(
  response => console.log('Respuesta del servidor: ', response),
  error => console.error('Error del servidor: ', error)
);

}


generateDownloadLink4(): void {
  const fileName4 = 'namelist.init_atmosphere';
  const dirGEO = this.dirGEO; 

  const fileContent4 = `&nhyd_model
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

// envía una solicitud al servidor para guardar el archivo
this.http.post('http://localhost:3000/saveFile', {
  fileName: fileName4,
  content: fileContent4
}).subscribe(
  response => console.log('Respuesta del servidor: ', response),
  error => console.error('Error del servidor: ', error)
);
  
}

//get_grib2.sh
generateDownloadLink5(): void {
  const fileName5 = 'get_grib2.sh'; 

  const fileContent5 = `#!/bin/bash
  # Baja fichero grib
  # $1 dia
  
  if [ $# -ne 1 ]
  then 
      echo "Error. Falta parametro: DIA (yyyymmdd)"
      exit
  fi
  
  DAY=$1
  HOUR=00
  
  wget -c -t inf --no-check-certificate --retry-connrefused -O GRIB\${HOUR} "https://nomads.ncep.noaa.gov/cgi-bin/filter_gfs_0p25.pl?file=gfs.t"\${HOUR}"""z.pgrb2.0p25.f0\${HOUR}&all_lev=on&all_var=on&dir=%2Fgfs.\${DAY}%2F\${HOUR}%2Fatmos" 
  `;

// envía una solicitud al servidor para guardar el archivo
this.http.post('http://localhost:3000/saveFile', {
  fileName: fileName5,
  content: fileContent5
}).subscribe(
  response => console.log('Respuesta del servidor: ', response),
  error => console.error('Error del servidor: ', error)
);
  
}

//link_grib.csh
generateDownloadLink6(): void {
  const fileName6 = 'link_grib.csh'; 

  const fileContent6 = `#!/bin/csh -f

  set alpha = ( A B C D E F G H I J K L M N O P Q R S T U V W X Y Z )
  set i1 = 1
  set i2 = 1
  set i3 = 1
  
  if ( ( \${#argv} == 1 ) || ( ( \${#argv} == 2 ) && ( \${2} == "." ) ) ) then
  
     rm -f GRIBFILE.??? >& /dev/null
  
     foreach f ( \${1}* )
     
        ln -sf \${f} GRIBFILE.$alpha[$i3]$alpha[$i2]$alpha[$i1]
        @ i1 ++
     
        if ( $i1 > 26 ) then
           set i1 = 1
           @ i2 ++
          if ( $i2 > 26 ) then
             set i2 = 1
             @ i3 ++
             if ( $i3 > 26 ) then
                echo "RAN OUT OF GRIB FILE SUFFIXES!"
             endif
          endif
        endif
     
     end
  else if ( \${#argv} > 1 ) then
  
     rm -f GRIBFILE.??? >& /dev/null
  
     foreach f ( $* )
     
        if ( $f != "." ) then
           ln -sf \${f} GRIBFILE.$alpha[$i3]$alpha[$i2]$alpha[$i1]
           @ i1 ++
     
           if ( $i1 > 26 ) then
              set i1 = 1
              @ i2 ++
              if ( $i2 > 26 ) then
                 set i2 = 1
                 @ i3 ++
                 if ( $i3 > 26 ) then
                    echo "RAN OUT OF GRIB FILE SUFFIXES!"
                 endif
              endif
           endif
        endif
     
     end
  else if ( \${#argv} == 0 ) then
     echo " " 
     echo " " 
     echo "   Please provide some GRIB data to link"
     echo "   usage: $0 path_to_grib_data/grib_data_root"
     echo " " 
     echo " " 
  endif
  
  `;

// envía una solicitud al servidor para guardar el archivo
this.http.post('http://localhost:3000/saveFile', {
  fileName: fileName6,
  content: fileContent6
}).subscribe(
  response => console.log('Respuesta del servidor: ', response),
  error => console.error('Error del servidor: ', error)
);
  
}


//namelist.wps
generateDownloadLink7(): void {
  const fileName7 = 'namelist.wps';
  const fecha = this.fecha;
  const hora = this.hora;

  const fileContent7 = `&share
  wrf_core = 'ARW',
    max_dom = 2,
  start_date = '${fecha}_${hora}','${fecha}_${hora}','${fecha}_${hora}'
  end_date   = '${fecha}_${hora}','${fecha}_${hora}','${fecha}_${hora}'
  interval_seconds = 1800
  io_form_geogrid = 2,
 /
 
 &geogrid
  parent_id         =   1,   1,   2
  parent_grid_ratio =   1,   3,   3
  i_parent_start    =   1,  38,  23
  j_parent_start    =   1,  40,  19
  e_we              = 128, 145, 46
  e_sn              = 121, 127, 43
  geog_data_res     = '5m','2m','30s'
  dx = 27000,
  dy = 27000,
  map_proj = 'lambert',
  ref_lat   =  39.83,
  ref_lon   = -2.03,
  truelat1  =  30.0,
  truelat2  =  60.0,
  stand_lon = -1.0,
 /
 
 &ungrib
  out_format = 'WPS',
  prefix = 'GFS',
 /
 
 &metgrid
  fg_name = 'GFS'
  io_form_metgrid = 2, 
 /
 `;

// envía una solicitud al servidor para guardar el archivo
this.http.post('http://localhost:3000/saveFile', {
  fileName: fileName7,
  content: fileContent7
}).subscribe(
  response => console.log('Respuesta del servidor: ', response),
  error => console.error('Error del servidor: ', error)
);
  
}

goToLast(): void {
  // parámetros y luego redirigir a /mallas
  this.router.navigate(['/last'], { queryParams: this.route.snapshot.queryParams });
}
goBack() {
  this.location.back();
}
  
}
