import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DatabaseService } from '../shared/database/database.service';
import { DatabaseInter } from '../modals/databases-inter';

import { Observable, BehaviorSubject } from 'rxjs';
import { dataSourceDatabase } from '../shared/database/database.datasource';
import { LoginService } from '../shared/login/login.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  displayedColumns: string[] = ['informacion', 'grafica'];
  private dbSubject = new BehaviorSubject<DatabaseInter[]>([]);

  dataSource: dataSourceDatabase;

  @ViewChild(MatTable) table: MatTable<any>;

  currentDB: number;
  databases: BehaviorSubject<DatabaseInter[]>;
  

  constructor(private dialog: MatDialog, private dbService: DatabaseService, private loginService: LoginService) { }

  ngOnInit() {
    this.dataSource = new dataSourceDatabase(this.dbService);
    this.getDBs();
  }

  getDBs() {
    this.dataSource.getDB(this.loginService.formLogin.value);
    this.databases = this.dataSource['subjectDataBases'];
    console.log(this.dataSource);
  }

  consultarDiscos() {
    console.log(this.currentDB);
  }

  openDialog(action) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.width = '400px';
    dialogConfig.data = {
      action: action
    };

    const dialogRef = this.dialog.open(DialogBoxComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      console.log("Dialog output:", data)
      if (data != undefined) {
        if (data.action == 'Agregar DB') {
          this.addDatabase(data);
        }
        else if (data.action == 'Agregar Disco') {
          
        } 
        else if (data.action == 'Agregar FG') {
          
        }
      }
    });
  }

  addDatabase(data) {
    this.dbService.addDatabase(data, this.loginService.formLogin.value).subscribe (res => {
      this.dbSubject.next(data);
    });
  }

}
