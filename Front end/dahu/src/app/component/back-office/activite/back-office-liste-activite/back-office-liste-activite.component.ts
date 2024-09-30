import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ActiviteService } from 'src/app/service/activite/activite.service';
import { SectionService } from 'src/app/service/section/section.service';
import { Activite } from 'src/app/data/activite/activite';
import { FilteActiviteService } from 'src/app/service/filtre-activite/filte-activite.service';
import { Type } from 'src/app/data/type/type';

@Component({
  selector: 'app-back-office-liste-activite',
  templateUrl: './back-office-liste-activite.component.html',
  styleUrl: './back-office-liste-activite.component.css'
})
export class BackOfficeListeActiviteComponent {
  activites: Activite[]
  constructor(private filtreService:FilteActiviteService,private router: Router,private activiteService:ActiviteService,private sectionService:SectionService) {
    this.activiteService.getActivitesBySection().subscribe(activites => {this.activites=activites;console.log(this.activites)});
    // let a = new Activite("fhezufioh", true, "fhzeiufhzoieufhzoieufhozieufhzoieufh", "fhziouefhzoiuefhoziuefhofziufgeyziueygfiuzeygfiuzeygfiuzegyfougyfpafnviodfhbvoeihbvzihbaoeihbfouzehbfouzbhyfouzbhyefozybfoefzioezoefzououvzefouvbhefzouvhefzoihbzeffouvvoaofehveftfpzoefhyygouizuefbgvyaifbfepogeihgpaoiubfeofuaheofbaeufboajbfeoufeoifbzoeiufb", "image.jpg", [], [], [], [], new Type("brunch"), [], 3.0)
    // let a1 = new Activite("fhezufioh", true, "azfazfazfazfazf", "fhziouefhzoiuefhoziuefhoizuefbgvyaifbfepogeihgpaoiubfeofuaheofbaeufboajbfeoufeoifbzoeiufb", "image.jpg", [], [], [], [], new Type("brunch"), [], 3.0)
    // let a2 = new Activite("fhezufioh", true, "azfazfazfazfazfazfazfa", "fhziouefhzoiuefhoziuefhoizuefbgvyaifbfepogeihgpaoiubfeofuaheofbaeufboajbfeoufeoifbzoeiufb", "image.jpg", [], [], [], [], new Type("brunch"), [], 3.0)
    // this.activites = [a, a1, a2, a, a1, a2, a, a1, a2, a, a1, a2, a1, a2, a, a1, a2, a, a1, a2, a, a1, a2, a1, a2, a, a1, a2, a, a1, a2, a, a1, a2]
  }

  deleteActivite(id:number, name: string){
    let suppr=confirm("Voulez-vous vraiment supprimer l'activité "+name);
    if(suppr){
      this.activiteService.deleteActiviteById(id).subscribe(any =>{
      this.activiteService.getActivitesBySection().subscribe(activites => {this.activites=activites});
      })

    }

  }


  update(id:number){
    this.router.navigate([this.sectionService.getAdresseDahu()+'/back-office/update-activite/'+id])
  }

  naviguerVersNouvelleActivite() {
    this.router.navigate([this.sectionService.getAdresseDahu()+'/back-office/create-activite']);
  }
}
