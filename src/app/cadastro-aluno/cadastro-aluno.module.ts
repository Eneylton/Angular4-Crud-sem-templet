import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputMaskModule } from 'primeng/inputmask';
import { CadastroAlunoComponent } from './cadastro-aluno/cadastro-aluno.component';
import { ContatosComponent } from './contatos/contatos.component';



@NgModule({
  imports: [
    CommonModule,
    DialogModule,
    TableModule,
    ButtonModule,
    PanelModule,
    InputTextModule,
    RouterModule,
    FormsModule,
    InputMaskModule

  ],
  declarations: [CadastroAlunoComponent, ContatosComponent],exports:[CadastroAlunoComponent]
})
export class CadastroAlunoModule { }
