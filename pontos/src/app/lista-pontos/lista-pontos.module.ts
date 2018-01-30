import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrosComponent } from './registros/registros.component';
import { ListaPontosComponent } from './lista-pontos.component';
import { ListaPontosRouting } from './lista-pontos.routing';
import { ListaPontosService } from './lista-pontos.service';
import { MzSelectModule } from 'ng2-materialize'

@NgModule({
  imports: [
    CommonModule,
    ListaPontosRouting ,
    MzSelectModule  
  ],
  declarations: [
    RegistrosComponent,
    ListaPontosComponent
  ],
  providers: [ListaPontosService]
})
export class ListaPontosModule { }
