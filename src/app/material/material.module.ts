import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as M from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    M.MatToolbarModule,
  ],
  exports: [
    M.MatToolbarModule,
  ]
})
export class MaterialModule { }
