import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const lista: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(lista)],
  exports: [RouterModule]
})

export class ListaPontosRouting { }
