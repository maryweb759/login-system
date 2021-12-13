import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class MyServiceService {
  readonly PORT_URL = 'http://localhost:3000'
  constructor(private http:HttpClient) { } 

  register(user: any) {
    return this.http.post(`${this.PORT_URL}/register`, user, {
      observe: 'body'
    })
  } 

  login(user: any) {
    return this.http.post(`${this.PORT_URL}/login`, user, {
      observe: 'body'
    })
  } 
  getusername() {
    return this.http.get(`${this.PORT_URL}/username`, {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    })
  }
}
