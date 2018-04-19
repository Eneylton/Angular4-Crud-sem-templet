import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroAlunoComponent } from './cadastro-aluno/cadastro-aluno.component';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
ButtonModule


@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    PanelModule,
    InputTextModule,
    RouterModule,
    FormsModule

  ],
  declarations: [CadastroAlunoComponent],exports:[CadastroAlunoComponent]
})
export class CadastroAlunoModule { }
