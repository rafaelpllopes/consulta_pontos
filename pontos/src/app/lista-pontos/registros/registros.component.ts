import { Subscription } from 'rxjs/Rx';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ListaPontosService } from './../lista-pontos.service';


@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.css']
})
export class RegistrosComponent implements OnInit, OnDestroy {

  ano: number;
  mes: number;
  matricula: string;
  ponto: string;
  inscricao: Subscription;

  registros: any[] = [];

  profissional: any = {
    nome: 'Joao',
    matricula: '2222',
    ponto: 'SMSI'
  };

  total: number;

  constructor(
    private service: ListaPontosService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.total = this.registros.length;

    this.inscricao = this.route.params.subscribe(params => {
      this.matricula = params['id'];
    });    
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }
}
