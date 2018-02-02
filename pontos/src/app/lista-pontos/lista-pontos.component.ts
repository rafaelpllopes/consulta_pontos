import { inject } from '@angular/core/testing';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ListaPontosService } from './lista-pontos.service';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-lista-pontos',
  templateUrl: './lista-pontos.component.html',
  styleUrls: ['./lista-pontos.component.css']
})
export class ListaPontosComponent implements OnInit, OnDestroy {

  pontos: any[];
  meses: any[];
  anos: number[] = [];
  profissionais: any[];
  //inscricao: Subscription;
  mesAtual = new Date().getMonth();
  anoAtual = new Date().getFullYear();

  filtro: string;

  constructor(
    private service: ListaPontosService
  ) { }

  ngOnInit() {
    this.profissionais = this.service.profissionais;
    this.meses = this.service.meses;
    this.anos = this.service.anos;
    this.pontos = this.service.pontos;
    this.profissionais = this.service.profissionais;
  }

  listaProfissionais() {
    if (this.profissionais.length === 0 || this.filtro === undefined
      || this.filtro.trim() === ''){
        return this.profissionais;
      }
  
      return this.profissionais.filter(
         v => v.nome.toLocaleLowerCase().includes(this.filtro.toLocaleLowerCase())
      );
  }

  ngOnDestroy() {
    //this.inscricao.unsubscribe();
  }
}
