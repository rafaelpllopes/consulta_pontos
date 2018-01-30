import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { ListaPontosModule } from './lista-pontos/lista-pontos.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ListaPontosModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
