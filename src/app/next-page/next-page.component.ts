import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.nombre = params['nombre'] || null;
      this.latitud = params['latitud'] || null;
      this.longitud = params['longitud'] || null;
      this.label = params['label'] || null;
      this.src = params['src'] ? this.extractRelativePath(params['src']) : null;
    });
  }
  private extractRelativePath(url: string): string {
    const startIndex = url.indexOf('assets/');
    if (startIndex !== -1) {
      return url.substring(startIndex);
    }
    return url;
  }

}
