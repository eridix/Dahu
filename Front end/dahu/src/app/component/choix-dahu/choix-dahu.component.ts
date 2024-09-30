import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SectionService } from 'src/app/service/section/section.service';
import { LoginComponent } from '../login/login.component';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { UtilisateurService } from 'src/app/service/utilisateur/utilisateur.service';
import { InscriptionComponent } from '../inscription/inscription.component';

@Component({
  selector: 'app-choix-dahu',
  templateUrl: './choix-dahu.component.html',
  styleUrls: ['./choix-dahu.component.css']
})
export class ChoixDahuComponent {
  constructor(private sectionService:SectionService,private router: Router,private utilisateurService:UtilisateurService){}

  selectDahu(){
    this.router.navigate(['/dahu/accueil']);
  }

  selectDahuDesNeiges(){
    this.router.navigate(['/dahu-des-neiges/accueil']);
  }
}
