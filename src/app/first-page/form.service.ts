import { Injectable } from '@angular/core';

@Injectable()
export class FormService {
  data: any = {};

  setData(data: any) {
    this.data = data;
  }

  getData() {
    return this.data;
  }
}
