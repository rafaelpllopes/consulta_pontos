import { Subscription } from 'rxjs/Rx';
import { Component, OnInit, OnDestroy, Input, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ListaPontosService } from './../lista-pontos.service';

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

  constructor(
    private service: ListaPontosService,
  ) { }

  ngOnInit() {}

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
}
