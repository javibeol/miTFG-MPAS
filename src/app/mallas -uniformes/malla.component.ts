import { Component, OnInit } from '@angular/core';
import { MallaService } from '../mallas/malla.service';

@Component({
  selector: 'app-malla',
  templateUrl: './malla.component.html',
  styleUrls: ['./malla.component.css']
})
export class MallaComponent {
  constructor(private mallaService: MallaService) {}

  selectedMesh: string = '';

  selectMesh(mesh: string): void {
    this.mallaService.setSelectedMesh(mesh);
  }
}
