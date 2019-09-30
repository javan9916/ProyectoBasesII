import { Component, OnInit } from '@angular/core';
import { LoginService } from "../shared/login/login.service"
import { LoginDataSource } from '../shared/login/login.datasource';
import { loginInter } from '../modals/login-inter';

import { BehaviorSubject } from "rxjs";
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  dataSource: LoginDataSource;
  private resultado: boolean;
  private loginSubject = new BehaviorSubject<loginInter[]>([]);

  constructor(
    private router: Router,
    private service: LoginService
    ) { }

  //loginForm: FormGroup;

  ngOnInit() {
    this.dataSource = new LoginDataSource(this.service);
  }

  onSubmit() {
    if(this.service.formLogin.valid){
      this.service.doLogin(this.service.formLogin.value)
        .subscribe(data =>{ 
          this.loginSubject.next(data['success']),       
          this.loginSubject.subscribe(data => {
              this.setResultado(data['Resultado'])
            });
          });
    } 
    else {
      console.log('No ha ingresado todos los datos');
    }
    this.service.formLogin.reset();
    this.service.inializeFormLogin();
  }

  setResultado(data: boolean){
    this.resultado = data;
    if (this.resultado == true){
      console.log('Bienvenido');
      this.router.navigateByUrl('/admin');
    }else{
      console.log('Por favor, verifique sus datos');
    }
  }

  //get formControls() { return this.loginForm.controls; }

}
