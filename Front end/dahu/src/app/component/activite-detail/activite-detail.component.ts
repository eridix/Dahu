import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Activite } from 'src/app/data/activite/activite';
import { ActiviteService } from 'src/app/service/activite/activite.service';
import { SectionService } from 'src/app/service/section/section.service';


@Component({
  selector: 'app-activite-detail',
  templateUrl: './activite-detail.component.html',
  styleUrls: ['./activite-detail.component.css']
})
export class ActiviteDetailComponent implements OnInit {
  fullStars: number = 0;
  emptyStars: number = 0;
  decimalPart: number = 0;
  moy: number = 0;
  @Input() activite!: Activite;


  constructor(private router: Router,private sectionService:SectionService){}

  ngOnInit(): void {
    let moy = 0;
    this.moy = moy;
    if (this.activite.moyenne) {
      moy = this.activite.moyenne;
    }

    this.fullStars = Math.floor(moy);
    this.decimalPart = moy - this.fullStars;

    // Calcul du nombre d'étoiles vides
    this.emptyStars = 5 - this.fullStars - 1;
  }

  getRange(value: number): number[] {
    return Array.from({ length: value });
  }

  goToActivite(id:number){
    // console.log('gone !');
    this.router.navigate([this.sectionService.getAdresseDahu()+'/activite/'+id]);
  }
    // this.nom=this.activite.nom;
    // this.type!=this.activite.themes.at(0)?.types.at(0)?.name;
    // this.imagePath=this.activite.image;
    // this.nbStars=4;
    // let i=0;
    // this.stars=new Array<number>;
    // this.starsFill=new Array<number>;

    /*this.pictosList[0]="vegan";
    this.pictosList[1]="handicap";*/
}
