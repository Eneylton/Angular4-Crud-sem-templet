import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Aluno } from '../core/model';

@Injectable()
export class CadastroAlunoService {

  alunoUrl = 'http://localhost:8080/alunos';

  constructor(private http: Http) { }

  buscarPorCodigo(codigo: number): Promise<Aluno> {
    const headers = new Headers();
          headers.append('Content-Type', 'application/json');

    return this.http.get(`${this.alunoUrl}/${codigo}`, { headers })
      .toPromise()
      .then(response => {
        const aluno = response.json() as Aluno;
    return aluno;
      });
  }

  adicionar(aluno: Aluno): Promise<Aluno> {
    const headers = new Headers();
          headers.append('Content-Type', 'application/json');

    return this.http.post(this.alunoUrl,
      JSON.stringify(aluno), { headers })
      .toPromise()
      .then(response => response.json());
  }

  atualizar(aluno: Aluno): Promise<Aluno> {
    const headers = new Headers();
          headers.append('Content-Type', 'application/json');
          console.log(aluno.id);
    return this.http.put(`${this.alunoUrl}/${aluno.id}`,
        JSON.stringify(aluno), { headers })
          .toPromise()
          .then(response => {
        const alunoAlterado = response.json() as Aluno;
    return alunoAlterado;
      });
  }
}
