import { Component, Input } from '@angular/core';
import { Actualite } from 'src/app/data/actualite/actualite';
import { ActualiteService } from 'src/app/service/actualite/actualite.service';
import { Utilisateur } from 'src/app/data/utilisateur/utilisateur';
import { Router } from '@angular/router';
import { SectionService } from 'src/app/service/section/section.service';
import { UtilisateurService } from 'src/app/service/utilisateur/utilisateur.service';

@Component({
  selector: 'app-back-office-create-actualite',
  templateUrl: './back-office-create-actualite.component.html',
  styleUrl: './back-office-create-actualite.component.css'
})
export class BackOfficeCreateActualiteComponent {
  actualite:Actualite;


constructor(private actualiteService:ActualiteService,private router:Router,private sectionService:SectionService,private utiliService: UtilisateurService){}

  ngOnInit(): void {
    const utilisateur=this.utiliService.utilisateurSubject.getValue()
    if(utilisateur){
      this.actualite=new Actualite("","","",utilisateur);
    }
  }
  goBack(): void{
    this.router.navigate([this.sectionService.getAdresseDahu()+'/back-office/actualites']);
  }
}
