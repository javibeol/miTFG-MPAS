import { Injectable } from '@angular/core';

@Injectable()
export class MallaService {
  private selectedUniformeMesh: string = '';
  private selectedMesh: string = '';
  private latitud: string | null = null;
  private longitud: string | null = null;

  setSelectedUniformeMesh(selectedUniformeMesh: string) {
    this.selectedUniformeMesh = selectedUniformeMesh;
  }

  getSelectedUniformeMesh(): string {
    return this.selectedUniformeMesh;
  }

  setSelectedMesh(selectedMesh: string) {
    this.selectedMesh = selectedMesh;
  }

  getSelectedMesh(): string {
    return this.selectedMesh;
  }

  setLatitud(latitud: string | null) {
    this.latitud = latitud;
  }

  getLatitud(): string | null {
    return this.latitud;
  }

  setLongitud(longitud: string | null) {
    this.longitud = longitud;
  }

  getLongitud(): string | null {
    return this.longitud;
  }
}
