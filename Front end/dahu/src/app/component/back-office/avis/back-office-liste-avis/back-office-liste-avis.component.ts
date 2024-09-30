import { Component } from '@angular/core';
import { Avis } from 'src/app/data/avis/avis';
import { Router } from '@angular/router';
import { AvisService } from 'src/app/service/avis/avis.service';
import { SectionService } from 'src/app/service/section/section.service';


@Component({
  selector: 'app-back-office-liste-avis',
  templateUrl: './back-office-liste-avis.component.html',
  styleUrl: './back-office-liste-avis.component.css'
})
export class BackOfficeListeAvisComponent {
  aviss: Avis[]
  
  constructor(private router: Router,
    private avisService:AvisService,
    private sectionService:SectionService) {
    this.getAvis();
  }
  getAvis(){
    this.avisService.getAvis().subscribe(avis => {
      this.aviss=avis;
      console.log(this.aviss);
    });
  }

  deleteAvis(id:number){
    let suppr=confirm("Voulez-vous vraiment supprimer cet avis ?");
    if(suppr){
      this.avisService.deleteAvisById(id).subscribe(any=>{
        this.getAvis();
      });
    }
  }
  getRange(value: number): number[] {
    return Array.from({ length: value });
  }
}
