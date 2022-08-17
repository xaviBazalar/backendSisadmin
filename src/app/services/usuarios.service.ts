import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  url:string=environment.baseUrl;

  constructor(private http:HttpClient) { }

  getUsuarios(){
    return this.http.get(`${this.url}/usuarios`)
  }
  


 
}
