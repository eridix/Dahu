import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilisateurService } from 'src/app/service/utilisateur/utilisateur.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChoixDahuComponent } from '../choix-dahu/choix-dahu.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports:[ReactiveFormsModule,CommonModule,FormsModule,MatDialogModule]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  constructor(
    private utiliService: UtilisateurService,
    private router: Router,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ChoixDahuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { utilisateurService: UtilisateurService, create_user: boolean }
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required]]
    });
  }

  // Connecte l'utilisateur auprès du Guard
  login() {
    console.log("sumit login")
    if (this.loginForm.valid) {
      const { name, password } = this.loginForm.value;
      this.data.utilisateurService.login(name, password).subscribe((isLoggedIn) => {
        if (isLoggedIn) {
          //Ferme la pop-up avec les données
          this.dialogRef.close(this.data)
        } else {
          this.loginForm.get('password')?.setErrors({ invalidCredentials: true });
        }
      });
    }
  }

  createUser() {
    console.log(this.data)
    this.data.create_user = true
    console.log(this.data)
    this.dialogRef.close(this.data)
  }

  // Déconnecte l'utilisateur
  logout() {
    this.data.utilisateurService.logout();
  }

  // Helper function to check if the email has a valid pattern
  isEmailValid(): boolean {
    const emailControl = this.loginForm.get('name');
    return !!emailControl?.hasError('pattern') && !!emailControl?.dirty;
  }

  invalidEmail(): boolean {
    const emailControl = this.loginForm.get('name');
    return !!emailControl?.hasError('required') && !!emailControl?.dirty;
  }

  // Helper function to check if the password is invalid
  isPasswordInvalid(): boolean {
    const passwordControl = this.loginForm.get('password');
    return !!passwordControl?.hasError('invalidCredentials') && !!passwordControl?.dirty;
  }

  // Fonction pour gérer "Mot de passe oublié"
  forgotPassword(): void {
    this.dialogRef.close();
    this.router.navigate(['/forgot-password']);
  }
}

