import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-condition-general',
  templateUrl: './condition-general.component.html',
  styleUrl: './condition-general.component.css' ,
  standalone: true,
  imports:[CommonModule,MatDialogModule]
})
export class ConditionGeneralComponent {

  constructor(private router: Router ,private dialogRef: MatDialogRef<ConditionGeneralComponent>) {}



  fermer() {
    // Fermer le MatDialog lorsque le bouton est cliqué
    this.dialogRef.close();
  }


}
