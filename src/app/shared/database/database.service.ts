import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  uri = 'http://localhost:3001';

  constructor(private http: HttpClient) { 
  }

  getDataBases(loginData) {
    return this.http.get(`${this.uri+'/BasesDatos/verBasesDatos'}`,{
      params: new HttpParams()
      .set('User',loginData.UserName)
      .set('Password',loginData.Password)
      .set('Server',loginData.Server)
      .set('Port',loginData.Port)
    });
  }

  addDatabase(data, loginData){
    return this.http.get(`${this.uri+'/BasesDatos/crearBasesDatos'}`,{
      params: new HttpParams()
      .set('DataBaseName', data.name)
      .set('User',loginData.UserName)
      .set('Password',loginData.Password)
      .set('Server',loginData.Server)
      .set('Port',loginData.Port)
    });
  }
}
