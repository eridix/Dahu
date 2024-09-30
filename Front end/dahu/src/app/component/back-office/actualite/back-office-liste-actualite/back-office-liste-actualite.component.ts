import { Component } from '@angular/core';
import { Actualite } from 'src/app/data/actualite/actualite';
import { ActualiteService } from 'src/app/service/actualite/actualite.service';
import { Router } from '@angular/router';
import { SectionService } from 'src/app/service/section/section.service';

@Component({
  selector: 'app-back-office-liste-actualite',

  templateUrl: './back-office-liste-actualite.component.html',
  styleUrl: './back-office-liste-actualite.component.css'
})
export class BackOfficeListeActualiteComponent {
  actualites: Actualite[]
  constructor(private router: Router,private actualiteService:ActualiteService,private sectionService:SectionService) {
    this.actualiteService.getActualites().subscribe(actualites => {this.actualites=actualites;});
  }

  deleteActualite(id:number, name: string){
    let suppr=confirm("Voulez-vous vraiment supprimer l'actualité "+name);
    if(suppr){
      this.actualiteService.deleteActualiteById(id).subscribe();
    }

  }


  update(id:number){
    this.router.navigate([this.sectionService.getAdresseDahu()+'/back-office/update-actualite/'+id])
  }

  naviguerVersNouvelleActualite() {
    this.router.navigate([this.sectionService.getAdresseDahu()+'/back-office/create-actualite']);
  }
}
