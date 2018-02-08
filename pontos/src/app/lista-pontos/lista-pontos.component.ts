import { Component, OnInit, OnDestroy } from '@angular/core';
import { ListaPontosService } from './lista-pontos.service';
import { Subscription } from 'rxjs/Rx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-pontos',
  templateUrl: './lista-pontos.component.html',
  styleUrls: ['./lista-pontos.component.css']
})
export class ListaPontosComponent implements OnInit, OnDestroy {

  pontos: any[] = [];
  profissionais: any[] = [];
  inscricaoProfissionais: Subscription;
  inscricaoPontos: Subscription;
  filtro: string;
  anos: any;
  meses: any;

  anoAtual = new Date().getFullYear();

  mes: number;
  ano: number;
  ponto: string;

  parametros: any;

  constructor(
    private service: ListaPontosService,
    private router: Router
  ) {
    this.ponto = '166';
    this.mes = new Date().getMonth() + 1;
    this.ano = new Date().getFullYear();
  }

  ngOnInit() {
    this.inscricaoPontos = this.service.getPontos().subscribe(
      dados => dados.forEach(
        dado => this.pontos.push(dado)
      )
    );
    this.anos = this.service.anos;
    this.meses = this.service.meses;
    this.buscarProfissionais();
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
    this.inscricaoProfissionais.unsubscribe();
  }

  buscarProfissionais() {
    this.profissionais.length = 0;
    this.inscricaoProfissionais = this.service.getProfissionais(this.ponto).subscribe(profissionais => {
      profissionais.forEach(profissional => {
        this.profissionais.push(profissional);
      })
    });
  }

  abrir(matricula: string, nome: string) {
    console.log(this.ponto);
     this.parametros = {
      'nome': nome,
      'matricula': matricula,
      'ponto': this.ponto,
      'mes': this.mes,
      'ano': this.ano
    };
  }
}
