import { Component, OnInit } from '@angular/core';
import { OportunidadeService } from '../oportunidade.service';

import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-painel-negociacao',
  templateUrl: './painel-negociacao.component.html',
  styleUrls: ['./painel-negociacao.component.css']
})
export class PainelNegociacaoComponent implements OnInit {
  
  oportunidade: any = {};
  oportunidades = [];

  constructor(private http: OportunidadeService, private msgService: MessageService) {
    
  }

  ngOnInit() {
    this.listarOps();
  }

  listarOps() {
    this.http.listar().subscribe(res => {
      this.oportunidades = <any> res;
    });
  }

  salvar(){
    
    if (this.oportunidade.id) {
      this.http.atualizar(this.oportunidade).subscribe(() => {
        this.limpar();
        this.listarOps();
        this.msgService.add({
          severity: 'success',
          summary: 'Sucesso!'
        });
      }, err => {
        let msg = err.error.message || 'Erro inesperado :('
        this.msgService.add({
          severity: 'error',
          summary: msg
        });
      });
    } else {
      this.http.adicionar(this.oportunidade).subscribe(() => {
        this.limpar();
        this.listarOps();
        this.msgService.add({
          severity: 'success',
          summary: 'Sucesso!'
        });
      }, err => {
        let msg = err.error.message || 'Erro inesperado :('
        this.msgService.add({
          severity: 'error',
          summary: msg
        });
      });
    }
  }

  atualizar(op) {
    this.oportunidade = {...op};
  }

  deletar(op) {
    this.http.deletar(op).subscribe(() => {
      this.limpar();
      this.listarOps();
      this.msgService.add({
        severity: 'success',
        summary: 'Sucesso!'
      });
    }, err => {
      let msg = err.error.message || 'Erro inesperado :('
      this.msgService.add({
        severity: 'error',
        summary: msg
      });
    });
  }

  limpar() {
    this.oportunidade = {};
  }

}
