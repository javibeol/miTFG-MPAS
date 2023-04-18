import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MallasComponent } from './mallas/mallas.component';
import { MallaComponent } from './malla/malla.component';

@NgModule({
  declarations: [
    AppComponent, MallasComponent, MallaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
