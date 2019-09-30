import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DB {
  name: string;
  id: number;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  displayedColumns: string[] = ['informacion', 'grafica'];

  @ViewChild(MatTable) table: MatTable<any>;

  uri = 'http://localhost:3001';

  databases: DB[];
  currentDB: string;

  constructor(private dialog: MatDialog, private http: HttpClient) { }

  ngOnInit() {
    this.getDBs();
  }

  getDBs() {
    return this.http.get(this.uri + '/BasesDatos/verBasesDatos').subscribe((res) => {
      console.log(res['content']);
      this.databases = res['content']
    });
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
          
        }
        else if (data.action == 'Agregar Disco') {
          
        } 
        else if (data.action == 'Agregar FG') {
          
        }
      }
    });
  }

}
