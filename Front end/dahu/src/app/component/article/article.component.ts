import { Component, OnInit } from '@angular/core';
import { Actualite } from 'src/app/data/actualite/actualite';
import { ActualiteService } from 'src/app/service/actualite/actualite.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent {
  actualite: Actualite;

  constructor(private actualiteService:ActualiteService,private route: ActivatedRoute){}

  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.actualiteService.getActualiteById(Number(id)).subscribe(actualite=>{
        if(actualite){
          this.actualite=actualite
        }
      })
    }
  }
}
