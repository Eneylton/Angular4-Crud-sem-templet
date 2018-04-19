import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms/src/forms';
import { ActivatedRoute } from '@angular/router';
import { Aluno, Contato } from '../../core/model';
import { CadastroAlunoService } from '../cadastro-aluno.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-cadastro-aluno',
  templateUrl: './cadastro-aluno.component.html',
  styleUrls: ['./cadastro-aluno.component.css']
})
export class CadastroAlunoComponent implements OnInit {

  aluno = new Aluno();
  contato: Contato;
  exbindoFormularioContato = false;
  contatoIndex: number;

  constructor(private cadastroAlunoService : CadastroAlunoService,
              private toasty: ToastyService,
              private route: ActivatedRoute,
              private title: Title,
              private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
    const codigoAluno = this.route.snapshot.params['codigo'];

    if (codigoAluno) {
      this.carregarAluno(codigoAluno);
    }
  }

  prepararNovoContato() {
    this.exbindoFormularioContato = true;
    this.contato = new Contato();
    this.contatoIndex = this.aluno.contatos.length;
  }

  prepararEdicaoContato(contato: Contato, index: number) {
    this.contato = this.clonarContato(contato);
    this.exbindoFormularioContato = true;
    this.contatoIndex = index;
  }

  confirmarContato(frm: FormControl) {
    this.aluno.contatos[this.contatoIndex] = this.clonarContato(this.contato);

    this.exbindoFormularioContato = false;

    frm.reset();
  }

  clonarContato(contato: Contato): Contato {
    return new Contato(contato.id,contato.email,contato.telefone);
  }

  get editando() {
    return Boolean(this.aluno.id)
  }



  carregarAluno(codigo: number) {
    this.cadastroAlunoService.buscarPorCodigo(codigo)
      .then(aluno => {
        this.aluno = aluno;
      });
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.cadastroAlunoService.atualizar(this.aluno);
      form.reset();
      this.toasty.success('Aluno atualizado com sucesso!');
    } else {

      this.cadastroAlunoService.adicionar(this.aluno);
      form.reset();

      this.toasty.success('Aluno cadastrado com sucesso!');

    }

  }

  removerContato(index: number) {
    this.aluno.contatos.splice(index, 1);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de lançamento: ${this.aluno.nome}`);
  }

}
