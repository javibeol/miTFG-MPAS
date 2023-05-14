import { Injectable } from '@angular/core';

@Injectable()
export class MallaService {
  private selectedUniformeMesh: string = '';
  private selectedMesh: string = '';

  getSelectedUniformeMesh(): string {
    return this.selectedUniformeMesh;
  }

  setSelectedUniformeMesh(mesh: string): void {
    this.selectedUniformeMesh = mesh;
  }

  getSelectedMesh(): string {
    return this.selectedMesh;
  }

  setSelectedMesh(mesh: string): void {
    this.selectedMesh = mesh;
  }
}
