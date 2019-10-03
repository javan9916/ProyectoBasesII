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
    UserName: new FormControl('sa', Validators.required),
    Password: new FormControl('24604763', Validators.required),
    Server: new FormControl('192.168.0.110', Validators.required),
    Port: new FormControl('1433', Validators.required),
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

  changeDataBase(database, login){
    this.formLogin.setValue({
      UserName: login.controls['UserName'].value,
      Password: login.controls['Password'].value,
      Server: login.controls['Server'].value,
      Port: login.controls['Port'].value,
      DataBase: database.controls['Name'].value
    })
  }

  doLogin(data){
    return this.http.get(`${this.uri+'/login/login'}`,{
      params: new HttpParams()
      .set('User',data.UserName)
      .set('Password',data.Password)
      .set('Server',data.Server)
      .set('Port',data.Port)
    });
  }


}