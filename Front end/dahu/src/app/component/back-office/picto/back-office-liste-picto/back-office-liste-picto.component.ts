import { Component } from '@angular/core';
import { Pictogramme } from 'src/app/data/pictogramme/pictogramme';
import { PictogrammeService } from 'src/app/service/pictogramme/pictogramme.service';
import { SectionService } from 'src/app/service/section/section.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-back-office-liste-picto',
  
  templateUrl: './back-office-liste-picto.component.html',
  styleUrl: './back-office-liste-picto.component.css'
})
export class BackOfficeListePictoComponent {
  pictos: Pictogramme[]
  constructor(private router: Router,private pictosService:PictogrammeService,private sectionService:SectionService) {
    this.pictosService.getPictogrammes().subscribe(pictos => {this.pictos=pictos;});
  }

  deletePicto(id:number, name: string){
    let suppr=confirm("Voulez-vous vraiment supprimer le pictogramme "+name);
    if(suppr){
      this.pictosService.deletePictogrammeById(id).subscribe();
    }

  }


  update(id:number){
    this.router.navigate([this.sectionService.getAdresseDahu()+'/back-office/update-picto/'+id])
  }

  naviguerVersNouveauPicto() {
    this.router.navigate([this.sectionService.getAdresseDahu()+'/back-office/create-picto']);
  }
}
