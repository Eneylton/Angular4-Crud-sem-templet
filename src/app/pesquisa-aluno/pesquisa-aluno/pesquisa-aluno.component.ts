import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { PesquisaAlunoService, AlunoFiltro } from '../pesquisa-aluno.service';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';

@Component({
  selector: 'app-pesquisa-aluno',
  templateUrl: './pesquisa-aluno.component.html',
  styleUrls: ['./pesquisa-aluno.component.css']
})
export class PesquisaAlunoComponent  {

  totalRegistros = 0;
  filtro = new AlunoFiltro();
  alunos = [];
  @ViewChild('tabela') grid;

  constructor(
    private pesquisaService: PesquisaAlunoService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private confirmation: ConfirmationService

  ) { }



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
