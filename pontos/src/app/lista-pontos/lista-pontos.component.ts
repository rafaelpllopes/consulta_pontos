import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-pontos',
  templateUrl: './lista-pontos.component.html',
  styleUrls: ['./lista-pontos.component.css']
})
export class ListaPontosComponent implements OnInit {

  pontos: any[];
  meses: any[];
  anos: number[] = [];

  constructor() { }

  ngOnInit() {
    this.pontos = [
      { nome: "SMSI", codigo: "2222" }
    ];

    this.meses = [
      { mes: 'Janeiro', numero: '01' },
      { mes: 'Fevereiro', numero: '02' },
      { mes: 'Março', numero: '03' },
      { mes: 'Abril', numero: '04' },
      { mes: 'Maio', numero: '05' },
      { mes: 'Junho', numero: '06' },
      { mes: 'Julho', numero: '07' },
      { mes: 'Agosto', numero: '08' },
      { mes: 'Setembro', numero: '09' },
      { mes: 'Outubro', numero: '10' },
      { mes: 'Novembro', numero: '11' },
      { mes: 'Dezembro', numero: '12' },
    ];

    this.addAno();
  }

  addAno(){
    let dataAtual = new Date();
    
    for(let ano = 2010; ano <= dataAtual.getFullYear(); ano++ ) {
      this.anos.push(ano);
    }
  }

}
