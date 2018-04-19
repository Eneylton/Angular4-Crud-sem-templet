import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';

export class AlunoFiltro {

  nome: string;

  pagina = 0;

  itensPorPagina = 7;
}

@Injectable()
export class PesquisaAlunoService {

  alunosDeleteURL = 'http://localhost:8080/alunos'

  alunosUrl = 'http://localhost:8080/alunos/alunoPaginacao';

  constructor(private http: Http) { }

  pesquisar(filtro: AlunoFiltro): Promise<any> {

    const params = new URLSearchParams();
    const headers = new Headers();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.alunosUrl}`, { headers, search: params })
    .toPromise()
    .then(response => {
      const responseJson = response.json();
      const alunos = responseJson.content;

      const resultado = {
        alunos,
        total: responseJson.totalElements
      };

      return resultado;
    })

  }


  remover(codigo:number): Promise<void> {
    const headers = new Headers();
    return this.http.delete(`${this.alunosDeleteURL}/${codigo}`, { headers })
      .toPromise()
      .then(() => null);
  }

}
