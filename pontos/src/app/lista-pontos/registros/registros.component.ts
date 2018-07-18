import { Subscription } from 'rxjs/Rx';
import { Component, OnInit, OnDestroy, Input, OnChanges, ViewChild, ElementRef } from '@angular/core';

import { ListaPontosService } from './../lista-pontos.service';
import { Hmh } from '../../helpers/Hmh';
import { Zfill } from '../../helpers/Zfill';

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
  hmh = new Hmh();
  zfill = new Zfill();
  @ViewChild('ref') ref: ElementRef; 

  constructor(
    private service: ListaPontosService,
  ) { }

  ngOnInit() {
    this.ref.nativeElement.focus();
  }

  ngOnChanges() {
    this.registros.length = 0;

    this.service.getUnidade(this.parametros.ponto).subscribe(unidade => this.unidade = unidade[0].nome);

    this.inscricaoRegistros = this.service.getRegistros(
      this.parametros.matricula, this.parametros.ponto, this.parametros.mes, this.parametros.ano
    ).subscribe(registros => 
      registros.forEach(registro => this.registros.push(registro))
    );
    this.ref.nativeElement.focus();
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
    
    if(result.h != null && result.m != null) {
      return result ? `${this.zfill.pad(parseInt(result.h), 2)}:${this.zfill.pad(result.m,2)}`:result;
    }

    return '';    
  }

  calculaHoras(horas) {
    let calc = [];
    let result;

    switch(horas.length){
      case 2:
      case 3: {
        result = this.hmh.diff(horas[0], horas[1], 'hours');
        return result;
      }
      case 4:
      case 5: {
        calc.push(this.hmh.diff(horas[0], horas[1], 'hours'));
        calc.push(this.hmh.diff(horas[2], horas[3], 'hours'));
        result = this.hmh.sum(`${this.zfill.pad(parseInt(calc[0].h), 2)}h ${calc[0].m}m ${this.zfill.pad(parseInt(calc[1].h), 2)}h ${calc[1].m}m`, 'hours');
        return result;
      }
      case 6:
      case 7: {
        let soma;
        calc.push(this.hmh.diff(horas[0], horas[1], 'hours'));
        calc.push(this.hmh.diff(horas[2], horas[3], 'hours'));
        calc.push(this.hmh.diff(horas[4], horas[5], 'hours'));
        soma = this.hmh.sum(`${this.zfill.pad(parseInt(calc[0].h), 2)}h ${calc[0].m}m ${this.zfill.pad(parseInt(calc[1].h), 2)}h ${calc[1].m}m`, 'hours');
        result = this.hmh.sum(`${this.zfill.pad(parseInt(soma.h), 2)}h ${soma.m}m ${this.zfill.pad(parseInt(calc[2].h), 2)}h ${calc[2].m}m`, 'hours');
        return result;
      }
      default: {
        return '';
      }
    }
  }
}
