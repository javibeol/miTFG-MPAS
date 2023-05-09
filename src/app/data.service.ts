import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MallaComponent } from "./malla/malla.component";
import { DatosPrueba } from "./datosPrueba.model";

@Injectable()
export class DataServices {
    constructor(private httpClient:HttpClient){}

    guardarDatos(datos:DatosPrueba[]) {
        this.httpClient.put('https://mitfg-b16c8-default-rtdb.europe-west1.firebasedatabase.app/datos.json', datos).subscribe(
            response=>console.log("Datos guardados correctamente: " + response),
            error=> console.log("Error " + error),
        );
    }

    cargarDatos(){
        return this.httpClient.get('https://mitfg-b16c8-default-rtdb.europe-west1.firebasedatabase.app/datos.json');
    }
}