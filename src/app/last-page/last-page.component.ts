import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-last-page',
  templateUrl: './last-page.component.html',
  styleUrls: ['./last-page.component.css']
})

export class LastPageComponent implements OnInit, AfterViewInit{
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

  //parámetros que vienen de next-page
  nombre: string | undefined;
  latitud: string | undefined;
  longitud: string | undefined;
  label: string | undefined;
  src: string | null | undefined;

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

});
this.generateDownloadLink1();
this.generateDownloadLink2();
this.generateDownloadLink3();
this.generateDownloadLink4();
}

ngAfterViewInit() {
  window.scrollTo(0, 0); // Ajusta la posición del scroll a la parte superior
}

//namelist.init_atmosphere
generateDownloadLink1(): void {
  const fileName1 = 'namelist.init_atmosphere';
  const fecha = this.fecha;
  const hora = this.hora;
  const dirGEO = this.dirGEO;  

  const fileContent1 = `&nhyd_model
    config_init_case = 7
    config_start_time = '${fecha}_${hora}'
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
  
  this.http.post('http://localhost:3000/saveFile', {
    fileName: fileName1,
    content: fileContent1
  }).subscribe(
    response => console.log('Respuesta del servidor: ', response),
    error => console.error('Error del servidor: ', error)
  );
}

//streams.init_atmosphere
generateDownloadLink2(): void {
  const fileName2 = 'streams.init_atmosphere';
  const nombre = this.nombre;  

  const fileContent2 = `<streams>
<immutable_stream name="input"
                  type="input"
                  filename_template="${nombre}.static.nc"
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
  
</streams>`;
  
  this.http.post('http://localhost:3000/saveFile', {
    fileName: fileName2,
    content: fileContent2
  }).subscribe(
    response => console.log('Respuesta del servidor: ', response),
    error => console.error('Error del servidor: ', error)
  );
}

//namelist.atmosphere
generateDownloadLink3(): void {
  const fileName3 = 'namelist.atmosphere';
  const nombre = this.nombre;  
  const fecha = this.fecha;
  const hora = this.hora;
  const duracion = this.duracion;

  const fileContent3 = `&nhyd_model
    config_time_integration_order = 2
    config_dt = 720.0
    config_start_time = '${fecha}_${hora}'
    config_run_duration = '${duracion}_00:00:00'
    config_split_dynamics_transport = true
    config_number_of_sub_steps = 2
    config_dynamics_split_steps = 3
    config_h_mom_eddy_visc2 = 0.0
    config_h_mom_eddy_visc4 = 0.0
    config_v_mom_eddy_visc2 = 0.0
    config_h_theta_eddy_visc2 = 0.0
    config_h_theta_eddy_visc4 = 0.0
    config_v_theta_eddy_visc2 = 0.0
    config_horiz_mixing = '2d_smagorinsky'
    config_len_disp = 120000.0
    config_visc4_2dsmag = 0.05
    config_w_adv_order = 3
    config_theta_adv_order = 3
    config_scalar_adv_order = 3
    config_u_vadv_order = 3
    config_w_vadv_order = 3
    config_theta_vadv_order = 3
    config_scalar_vadv_order = 3
    config_scalar_advection = true
    config_positive_definite = false
    config_monotonic = true
    config_coef_3rd_order = 0.25
    config_epssm = 0.1
    config_smdiv = 0.1
/
&damping
    config_zd = 22000.0
    config_xnutr = 0.2
/
&limited_area
    config_apply_lbcs = false
/
&io
    config_pio_num_iotasks = 0
    config_pio_stride = 1
/
&decomposition
    config_block_decomp_file_prefix = '${nombre}.graph.info.part.'
/
&restart
    config_do_restart = false
/
&printout
    config_print_global_minmax_vel = true
    config_print_detailed_minmax_vel = false
/
&IAU
    config_IAU_option = 'off'
    config_IAU_window_length_s = 21600.
/
&physics
    config_sst_update = false
    config_sstdiurn_update = false
    config_deepsoiltemp_update = false
    config_radtlw_interval = '00:30:00'
    config_radtsw_interval = '00:30:00'
    config_bucket_update = 'none'
    config_physics_suite = 'mesoscale_reference'
/
&soundings
    config_sounding_interval = 'none'
/
`;
  
  this.http.post('http://localhost:3000/saveFile', {
    fileName: fileName3,
    content: fileContent3
  }).subscribe(
    response => console.log('Respuesta del servidor: ', response),
    error => console.error('Error del servidor: ', error)
  );
}

//streams.atmosphere
generateDownloadLink4(): void {
  const fileName4 = 'streams.atmosphere';
  const nombre = this.nombre;  

  const fileContent4 = `<streams>
<immutable_stream name="input"
                  type="input"
                  filename_template="${nombre}.init.nc"
                  input_interval="initial_only" />
  
<immutable_stream name="restart"
                  type="input;output"
                  filename_template="restart.$Y-$M-$D_$h.$m.$s.nc"
                  input_interval="initial_only"
                  output_interval="1_00:00:00" />
  
<stream name="output"
        type="output"
        filename_template="history.$Y-$M-$D_$h.$m.$s.nc"
        output_interval="6:00:00" >
  
    <file name="stream_list.atmosphere.output"/>
</stream>
  
<stream name="diagnostics"
        type="output"
        filename_template="diag.$Y-$M-$D_$h.$m.$s.nc"
        output_interval="3:00:00" >
  
    <file name="stream_list.atmosphere.diagnostics"/>
</stream>
  
<stream name="surface"
        type="input"
        filename_template="${nombre}.sfc_update.nc"
        filename_interval="none"
        input_interval="none" >
  
    <file name="stream_list.atmosphere.surface"/>
</stream>
  
<immutable_stream name="iau"
                  type="input"
                  filename_template="${nombre}.AmB.$Y-$M-$D_$h.$m.$s.nc"
                  filename_interval="none"
                  packages="iau"
                  input_interval="initial_only" />
  
<immutable_stream name="lbc_in"
                  type="input"
                  filename_template="lbc.$Y-$M-$D_$h.$m.$s.nc"
                  filename_interval="input_interval"
                  packages="limited_area"
                  input_interval="3:00:00" />
  
</streams>
  `;
  
  this.http.post('http://localhost:3000/saveFile', {
    fileName: fileName4,
    content: fileContent4
  }).subscribe(
    response => console.log('Respuesta del servidor: ', response),
    error => console.error('Error del servidor: ', error)
  );
}

private extractRelativePath(url: string): string {
  const startIndex = url.indexOf('assets/');
  if (startIndex !== -1) {
    return url.substring(startIndex);
  }
  return url;
}

goBack() {
  this.location.back();
}

goToHome(): void {
  // parámetros y luego redirigir a /mallas
  this.router.navigate(['/']);
}

}