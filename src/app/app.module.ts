import { PesquisaAlunoModule } from './pesquisa-aluno/pesquisa-aluno.module';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CadastroAlunoModule } from './cadastro-aluno/cadastro-aluno.module';
import { CadastroAlunoComponent } from './cadastro-aluno/cadastro-aluno/cadastro-aluno.component';


import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CadastroAlunoModule,
    PesquisaAlunoModule,
    CoreModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
