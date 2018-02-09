import { Subscription } from 'rxjs/Rx';
import { Component, OnInit, OnDestroy, Input, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ListaPontosService } from './../lista-pontos.service';
import { Hmh } from '../../helpers/calcular';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.css']
})
export class RegistrosComponent implements OnInit, OnDestroy, OnChanges {

  @Input() parametros: any;
  inscricaoRegistros: Subscription;
  registros: any[] = [];
  unidade: string;
  hmh = new Hmh;

  constructor(
    private service: ListaPontosService,
  ) { }

  ngOnInit() {
    /*let tempo1 = this.hmh.diff('08h 00m', '12h 02m', 'hours');
    let tempo2 = this.hmh.diff('13h 05m', '17h 10m', 'hours');
    let hora1 = `${parseInt(tempo1.h)}h ${tempo1.m}m`;
    let hora2 = `${parseInt(tempo2.h)}h ${tempo2.m}m`
    console.log(hora1);
    console.log(hora2);
    console.log(this.hmh.sum(`${hora1} ${hora2}`, 'hours'));*/
  }

  ngOnChanges() {
    this.registros.length = 0;
    
    if (this.parametros.ponto == '166'){
      this.unidade = 'SMSI';
    } else {
      this.service.getUnidade(this.parametros.ponto).subscribe(unidade => this.unidade = unidade[0].nome);
    }

    this.inscricaoRegistros = this.service.getRegistros(
      this.parametros.matricula, this.parametros.ponto, this.parametros.mes, this.parametros.ano
    ).subscribe(registros => 
      registros.forEach(registro => this.registros.push(registro))
    );
  } 

  ngOnDestroy() {
    this.inscricaoRegistros.unsubscribe();
  }

  countRegistros() {
    let total: number = 0;
    this.registros.forEach(registro => registro.horas.forEach(hora => total++));
    return total;
  }

  calculo(horarios) {
    let horas: any = [];
    
    horarios.forEach(hora => {
      let div = hora.split(':');
      horas.push(`${div[0]}h ${div[1]}m`);
    });
    let result = this.calculaHoras(horas);
    return `${parseInt(result.h)}:${result.m}`;
  }

  calculaHoras(horas) {
    let calc = [];
    let ref: number = 0;
    let result: any;
    if(horas.length % 2 == 0) {
      for(let i = 0; i < horas.length; i++){
        calc.push(this.hmh.diff(horas[ref], horas[ref+1], 'hours'));
        console.log(calc);
        ref += 2;
      }
      return this.hmh.sum(calc[0], calc[1]);
    }
  }
}
