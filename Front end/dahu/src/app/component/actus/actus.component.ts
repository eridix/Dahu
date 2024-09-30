import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actualite } from 'src/app/data/actualite/actualite';
import { ActualiteService } from 'src/app/service/actualite/actualite.service';
import { SectionService } from 'src/app/service/section/section.service';

@Component({
  selector: 'app-actus',
  templateUrl: './actus.component.html',
  styleUrls: ['./actus.component.css']
})
export class ActusComponent implements OnInit {
  actualites:Actualite[]

  constructor(private router: Router,private sectionService:SectionService,private actualiteService:ActualiteService){}

  ngOnInit(): void {
    this.actualiteService.getActualites().subscribe(actualites =>this.actualites=actualites)
  }


  goToArticle(id:number) {
    this.router.navigate([this.sectionService.getAdresseDahu()+'/article/'+id]);
  }
}
