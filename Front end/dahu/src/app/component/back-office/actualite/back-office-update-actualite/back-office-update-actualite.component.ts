import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Actualite } from 'src/app/data/actualite/actualite';
import { Observable } from 'rxjs';
import { ActualiteService } from 'src/app/service/actualite/actualite.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { SectionService } from 'src/app/service/section/section.service';

@Component({
  selector: 'app-back-office-update-actualite',
  templateUrl: './back-office-update-actualite.component.html',
  styleUrl: './back-office-update-actualite.component.css'
})
export class BackOfficeUpdateActualiteComponent {
  actualite:Actualite
  actualiteObservable:Observable<Actualite|undefined>

  constructor(private actualiteService:ActualiteService,private route: ActivatedRoute,private router:Router,private sectionService:SectionService){}

  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.actualiteObservable=this.actualiteService.getActualiteById(Number(id))
    }
  }

  goBack(): void{
    this.router.navigate([this.sectionService.getAdresseDahu()+'/back-office/actualites']);
  }
}
