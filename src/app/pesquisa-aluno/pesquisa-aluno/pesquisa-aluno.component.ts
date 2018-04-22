import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { PesquisaAlunoService, AlunoFiltro } from '../pesquisa-aluno.service';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { ActivatedRoute } from '@angular/router';
import { Aluno } from '../../core/model';
import { CadastroAlunoService } from '../../cadastro-aluno/cadastro-aluno.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-pesquisa-aluno',
  templateUrl: './pesquisa-aluno.component.html',
  styleUrls: ['./pesquisa-aluno.component.css']
})
export class PesquisaAlunoComponent implements OnInit  {

  aluno = new Aluno();
  totalRegistros = 0;
  filtro = new AlunoFiltro();
  exbindoFormularioContato = false;
  alunos = [];
  @ViewChild('tabela') grid;



  constructor(
    private pesquisaService: PesquisaAlunoService,
    private cadastroAlunoService: CadastroAlunoService,
    private toasty: ToastyService,
    private route: ActivatedRoute,
    private errorHandler: ErrorHandlerService,
    private confirmation: ConfirmationService

  ) { }

  ngOnInit() {
    const codigoAluno = this.route.snapshot.params['codigo'];

    if (codigoAluno) {
      this.carregarAluno(codigoAluno);
    }
  }

  carregarAluno(codigo: number) {
    this.cadastroAlunoService.buscarPorCodigo(codigo)
      .then(aluno => {
        this.aluno = aluno;
      });
  }

  get editando() {
    return Boolean(this.aluno.id)
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.cadastroAlunoService.atualizar(this.aluno);
      form.reset();
      this.toasty.success('Aluno atualizado com sucesso!');
    } else {

      this.cadastroAlunoService.adicionar(this.aluno);
      form.reset();
      this.pesquisar();

      this.toasty.success('Aluno cadastrado com sucesso!');

    }

  }

  prepararNovoContato() {
    this.exbindoFormularioContato = true;
  }


  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.pesquisaService.pesquisar(this.filtro)
    .then(resultado => {
      this.totalRegistros = resultado.total;
      this.alunos = resultado.alunos;
    });
}


  confirmarExclusao(aluno: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(aluno);
      }
    });
  }



  excluir(codigo: number) {
    this.pesquisaService.remover(codigo)
      .then(() => {
        if (this.grid.first === 0){
          this.pesquisar();
        }else{

          this.grid.first = 0;
        }

        this.toasty.success('Aluno excluído com sucesso!');
      });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }


}
