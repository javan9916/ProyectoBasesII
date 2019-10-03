import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { LoginService } from '../../shared/login/login.service';
import { DatabaseService } from 'src/app/shared/database/database.service';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit {

  form: FormGroup;
  nombreBD: string;
  database: number;
  tamaño: number;
  crecimiento: number;
  tMaximo: number;
  uso: number;
  action: string;

  constructor(private fb: FormBuilder,
    private dbService: DatabaseService, 
    private loginService: LoginService,
    private dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) data, public dialog: MatDialog) { 

      if (data.action == 'Agregar Disco') {
        this.database = data.database;
      }
      this.action = data.action;
    }

  ngOnInit() {
    this.form = this.fb.group({
      nombreBD: [this.nombreBD],
      action: [this.action] 
    });
  }

  
  save() {
    if(this.loginService.formLogin.valid){
      console.log(this.dbService.formDataBase.value)
      console.log(this.loginService.formLogin.value)
      this.loginService.changeDataBase(
        this.dbService.formDataBase, 
        this.loginService.formLogin);
      this.dbService.addDatabase(
        this.dbService.formDataBase.value, 
        this.loginService.formLogin.value).subscribe();
      }
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }

}
