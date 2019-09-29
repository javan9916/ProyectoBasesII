import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  displayedColumns: string[] = ['informacion', 'grafica'];

  @ViewChild(MatTable) table: MatTable<any>;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    
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
