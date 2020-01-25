import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class OportunidadeService {
  
  apiUrl='http://localhost:8080/oportunidades';

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get(this.apiUrl);
  }

  adicionar(op) {
    return this.http.post(this.apiUrl, op);
  }

  atualizar(op){
    return this.http.put(this.apiUrl, op);
  }

  deletar(op) {
    return this.http.delete(this.apiUrl + `/${op.id}`);
  }

}
