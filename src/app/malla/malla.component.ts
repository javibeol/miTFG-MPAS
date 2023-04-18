import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-malla',
  templateUrl: './malla.component.html',
  styleUrls: ['./malla.component.css']
})
export class MallaComponent {

  nombre="Malla 1";

  descripcion="asdf";

  private prueba = 12;

  //accede a valor private
  getPrueba(){
    return this.prueba;
  }

  usuarioRegistrado=false;
  
  textoRegistro="No hay nadie registrado";

  getRegistroUsuario(){
    this.usuarioRegistrado=false;
  }

  setUsuarioRegistrado(event:Event){
    //alert ("El usuario se acaba de registrar");
    //this.textoRegistro="El usuario se acaba de registrar";

    if((<HTMLInputElement>event.target).value=="si"){
      
      this.textoRegistro="El usuario se acaba de registrar";

    }else{

      this.textoRegistro="No hay nadie registrado";

    }
  }


  constructor(){}

}
