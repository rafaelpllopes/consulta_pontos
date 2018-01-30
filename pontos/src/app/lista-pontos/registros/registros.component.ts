import { ListaPontosService } from './../lista-pontos.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.css']
})
export class RegistrosComponent implements OnInit {

  registros: any[];

  profissional: any = {
    nome: 'Joao',
    matricula: '2222',
    ponto: 'SMSI'
  };

  total: number;

  constructor(
    private service: ListaPontosService
  ) { }

  ngOnInit() {
    this.registros = this.service.registros;
    this.total = this.registros.length;
  }
}
