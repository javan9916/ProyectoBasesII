import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  displayedColumns: string[] = ['tamano', 'crecimiento', 'maximo', 'uso'];

  @ViewChild(MatTable) table: MatTable<any>;

  constructor() { }

  ngOnInit() {
    
  }

}
