import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Api {
  

  constructor(
    private http: HttpClient
  ) {

  }

  getDatos() {
    return this.http.get<any>(`https://mindicador.cl/api`)
  }

}
