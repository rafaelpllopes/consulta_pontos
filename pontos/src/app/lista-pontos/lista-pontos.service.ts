import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ListaPontosService {

  meses: any[] = [
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

  anos: number[] = [];

  profissionais: any[] = [
    { nome: 'Joao', matricula: '2222', ponto: 'SMSI' }
  ];

  pontos: any[] = [
    { nome: "SMSI", codigo: "166" }
  ];

  registros: any[] = [
    { profissional: 'joao', matricula: '2222', data:'20/20/2000', hora: '20:00' },
    { profissional: 'joao', matricula: '2222', data:'20/20/2000', hora: '20:00' },
    { profissional: 'joao', matricula: '2222', data:'20/20/2000', hora: '20:00' },
    { profissional: 'joao', matricula: '2222', data:'20/20/2000', hora: '20:00' },
    { profissional: 'joao', matricula: '2222', data:'20/20/2000', hora: '20:00' },
    { profissional: 'joao', matricula: '2222', data:'20/20/2000', hora: '20:00' },
    { profissional: 'joao', matricula: '2222', data:'20/20/2000', hora: '20:00' },
    { profissional: 'joao', matricula: '2222', data:'20/20/2000', hora: '20:00' },
    { profissional: 'joao', matricula: '2222', data:'20/20/2000', hora: '20:00' },
    { profissional: 'joao', matricula: '2222', data:'20/20/2000', hora: '20:00' },
    { profissional: 'joao', matricula: '2222', data:'20/20/2000', hora: '20:00' }
  ];

  constructor() {
    this._addAno();
  }

  private _addAno(){
    let dataAtual = new Date();
    
    for(let ano = 2010; ano <= dataAtual.getFullYear(); ano++ ) {
      this.anos.push(ano);
    }
  }
}
