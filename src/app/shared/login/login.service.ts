import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  uri = 'http://localhost:3001';

  constructor(private http: HttpClient) { }

  formLogin: FormGroup = new FormGroup({
    UserName: new FormControl('', Validators.required),
    Password: new FormControl('', Validators.required),
    Server: new FormControl('', Validators.required),
    Port: new FormControl('', Validators.required),
    DataBase: new FormControl(null),
  });

  inializeFormLogin(){
    this.formLogin.setValue({
      UserName: '',
      Password: '',
      Server: '',
      Port: '',
      DataBase: null
    })
  }

  doLogin(data){
    return this.http.get(`${this.uri+'/login/login'}`,{
      params: new HttpParams()
      .set('User',data.UserName)
      .set('Password',data.Password)
      .set('Server',data.Server)
    });
  }
}