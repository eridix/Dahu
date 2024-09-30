import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Activite } from 'src/app/data/activite/activite';
import { ActiviteService } from 'src/app/service/activite/activite.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SectionService } from 'src/app/service/section/section.service';

@Component({
  selector: 'app-back-office-update-activite',
  templateUrl: './back-office-update-activite.component.html',
  styleUrl: './back-office-update-activite.component.css'
})
export class BackOfficeUpdateActiviteComponent implements OnInit{
  activite:Activite
  activiteObservable:Observable<Activite|undefined>

  constructor(private activiteService:ActiviteService,
    private route: ActivatedRoute,
    private sectionService:SectionService,
    private router:Router){}

  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.activiteObservable=this.activiteService.getActiviteById(Number(id))
      // .subscribe(activite=>{
      //   if(activite){
      //     this.activite=activite
      //   }
      // })
    }
  }

  goBack(): void{
    this.router.navigate([this.sectionService.getAdresseDahu()+'/back-office/activites']);
  }

}
