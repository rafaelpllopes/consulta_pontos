import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaPontosComponent } from './lista-pontos/lista-pontos.component';

const routes: Routes = [
  { path: 'home', component: ListaPontosComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
