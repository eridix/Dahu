import { Component, OnInit } from '@angular/core';
import { Pictogramme } from 'src/app/data/pictogramme/pictogramme';
import { Observable } from 'rxjs';
import { PictogrammeService } from 'src/app/service/pictogramme/pictogramme.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { SectionService } from 'src/app/service/section/section.service';


@Component({
  selector: 'app-back-office-update-picto',
  
  templateUrl: './back-office-update-picto.component.html',
  styleUrl: './back-office-update-picto.component.css'
})
export class BackOfficeUpdatePictoComponent implements OnInit {
  picto:Pictogramme
  pictoObservable:Observable<Pictogramme|undefined>

  constructor(private pictoService:PictogrammeService,private route: ActivatedRoute,private router:Router,private sectionService:SectionService){}

  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.pictoObservable=this.pictoService.getPictogrammeById(Number(id))
    }
  }

  goBack(): void{
    this.router.navigate([this.sectionService.getAdresseDahu()+'/back-office/pictos']);
  }
}
