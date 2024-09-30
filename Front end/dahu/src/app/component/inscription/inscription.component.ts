import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import { UtilisateurService } from 'src/app/service/utilisateur/utilisateur.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Utilisateur } from 'src/app/data/utilisateur/utilisateur';
import { first } from 'rxjs';
import {LoginComponent} from "../login/login.component";
import {ConditionGeneralComponent} from "../condition-general/condition-general.component";

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
})


export class InscriptionComponent implements OnInit {
  create_userForm!: FormGroup;
  emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  confirmPasswordError=false;
  passwordMinLength: number = 8;

  constructor(
    private utilisateurService: UtilisateurService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<InscriptionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { utilisateurService: UtilisateurService, login: boolean },
    public dialog:MatDialog
  ) {}



  ngOnInit(): void {
    this.create_userForm = this.fb.group({
      prenom: ['', [Validators.required]],
      nom: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required,
        Validators.minLength(8),
        this.contientNombreValidator(),
        this.contientLettreEtMajusculeValidator(),
      ]],
      confirmPassword: ['', [Validators.required]],
      acceptConditions: [false, [Validators.requiredTrue]],
    }, { validators: [this.passwordMatchValidator] });
  }

  create_user() {
    console.log(this.create_userForm)
    if (this.create_userForm.valid) {
      console.log("valid")
      const { nom, prenom, email ,password,confirmPassword } = this.create_userForm.value;
      if(password==confirmPassword){
        console.log("password equal")
        this.confirmPasswordError=false
        const utilisateur:Utilisateur=new Utilisateur(nom,prenom,email,password)
        this.utilisateurService.addUtilisateur(utilisateur).pipe(first()).subscribe(user=>{
          if(user){
            this.dialogRef.close(this.data)
          }
        })
      }else{
        this.confirmPasswordError=true
      }

    }

  };

  passwordMatchValidator(group: FormGroup): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { mismatch: true };
  }


  contientNombreValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const valeur = control.value;
      if (!valeur) {
        return null;
      }
      const regexNombre = /\d/;

      if (!regexNombre.test(valeur)) {
        return { 'contientNombre': true };
      }

      return null;
    };
  }


  contientLettreEtMajusculeValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const valeur = control.value;
      if (!valeur) {
        return null;
      }

      const regexLettre = /[a-z]/; // Vérifie la présence d'au moins une lettre minuscule
      const regexMajuscule = /[A-Z]/; // Vérifie la présence d'au moins une lettre majuscule

      if (!regexLettre.test(valeur) || !regexMajuscule.test(valeur)) {
        return { 'contientLettreEtMajuscule': true };
      }

      return null;
    };
  }

    login() {
    this.data.login = true;
    this.dialogRef.close(this.data);
  }


  condition() {

    const dialogConfig = new MatDialogConfig();

    //dialogConfig.disableClose = true;
    //dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(ConditionGeneralComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {

    });

  }



}













