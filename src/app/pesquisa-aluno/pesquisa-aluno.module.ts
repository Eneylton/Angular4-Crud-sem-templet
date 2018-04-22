import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PesquisaAlunoComponent } from './pesquisa-aluno/pesquisa-aluno.component';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  imports: [
    CommonModule,
    TableModule,
    DialogModule,
    ButtonModule,
    PanelModule,
    RouterModule,
    FormsModule
  ],
  declarations: [PesquisaAlunoComponent],exports:[PesquisaAlunoComponent]
})
export class PesquisaAlunoModule { }
