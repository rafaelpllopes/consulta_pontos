import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class ListaPontosService {

  private headers: Headers;
  private host = location.host; //Produçao *descomentar e comentar a de baixo quando for fazer o build*
  //private host = '189.44.213.211:8083'; //Desenvolvimento

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

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json; charset=utf-8');
    this.headers.append("Access-Control-Allow-Origin", "*");
    this.headers.append("Access-Control-Allow-Headers", "Access-Control-Allow-Origin, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    this._addAno();
  }

  private _addAno(){
    let dataAtual = new Date();
    
    for(let ano = 2010; ano <= dataAtual.getFullYear(); ano++ ) {
      this.anos.push(ano);
    }
  }

  getPontos(){
    return this.http
      .get(`http://${this.host}/pontos/consultaPontos.php`, {'headers': this.headers})
      .map(dados => dados.json());
  }

  getProfissionais(ponto) {
    return this.http
      .get(`http://${this.host}/pontos/consultaNomes.php?local=${ponto}`, {'headers': this.headers})
      .map(dados => dados.json());
  }

  getRegistros(matricula, ponto, mes, ano) {
    return this.http
      .get(`http://${this.host}/pontos/consultaRegistros.php?local=${ponto}&matricula=${matricula}&mes=${mes}&ano=${ano}`, {'headers': this.headers})
      .map(dados => dados.json());
  }

  getUnidade(ponto) {
    return this.http
      .get(`http://${this.host}/pontos/consultaPontosNomes.php?local=${ponto}`, {'headers': this.headers})
      .map(dados => dados.json());
  }
}
