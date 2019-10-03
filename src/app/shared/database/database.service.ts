import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  uri = 'http://localhost:3001';

  constructor(private http: HttpClient) { 
  }

  formDataBase: FormGroup = new FormGroup({
    Name: new FormControl('', Validators.required)
  });

  inializeFormLogin(){
    this.formDataBase.setValue({
      Name: '',
    })
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
    console.log(data.Name)
    const obj ={
      User: loginData.UserName,
      Password: loginData.Password,
      Server: loginData.Server,
      DataBase: loginData.DataBase,
      port: loginData.Port,
      Name: data.Name
    };
    return this.http.post(`${this.uri+'/BasesDatos/crearBasesDatos'}`,obj);
  }
}
