import { Component, OnInit } from '@angular/core';
import { ListaPontosService } from './lista-pontos.service';
import { Data } from '@angular/router/src/config';

@Component({
  selector: 'app-lista-pontos',
  templateUrl: './lista-pontos.component.html',
  styleUrls: ['./lista-pontos.component.css']
})
export class ListaPontosComponent implements OnInit {

  pontos: any[];
  meses: any[];
  anos: number[] = [];
  profissionais: any[];

  mesAtual = new Date().getMonth();
  anoAtual = new Date().getFullYear();

  filtro: string;

  constructor(
    private service: ListaPontosService
  ) { }

  ngOnInit() {
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
}
