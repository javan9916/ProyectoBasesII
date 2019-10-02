import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit {

  form: FormGroup;
  nombreBD: string;
  action: string;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) data, public dialog: MatDialog) { 

      this.action = data.action;
    }

  ngOnInit() {
    this.form = this.fb.group({
      nombreBD: [this.nombreBD],
      action: [this.action] 
    });
  }

  
  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}
