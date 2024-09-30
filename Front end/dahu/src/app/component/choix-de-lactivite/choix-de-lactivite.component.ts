import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActiviteService } from 'src/app/service/activite/activite.service';
import { SectionService } from 'src/app/service/section/section.service';
import { Activite } from 'src/app/data/activite/activite';
import { Pictogramme } from 'src/app/data/pictogramme/pictogramme';
import { Section } from 'src/app/data/section/section';
import { Theme } from 'src/app/data/theme/theme';
import { Type } from 'src/app/data/type/type';
import { FilteActiviteService } from 'src/app/service/filtre-activite/filte-activite.service';

@Component({
  selector: 'app-choix-de-lactivite',
  templateUrl: './choix-de-lactivite.component.html',
  styleUrls: ['./choix-de-lactivite.component.css']
})
export class ChoixDeLActiviteComponent implements OnInit {
  activites: Activite[]
  color:[string,string,string, string]
  printListe: boolean
  isChecked: boolean = false
  chosen_item: string = "Liste"

  constructor(public filtreService:FilteActiviteService,private activiteService: ActiviteService,private sectionService:SectionService){}

  ngOnInit(): void{
    this.color=this.sectionService.getColor();
    // this.filtreService.activites.subscribe(activites => {this.activites=activites;console.log(this.activites)});
    this.printListe=true;
    console.log("init");


    // this.activiteService.getActivites().subscribe(activites =>{console.log(activites); this.activites=activites})
    this.filtreService.activites$.subscribe(activites=>{
      this.activites=activites
      console.log(this.activites)
    })


    //example --> à supprimer lors de l'intégration avec la bd
    // let a=new Activite("L'envie des mets","","",
    // "../../../assets/activities/test/test-activite.jpeg",
    // new Array(new Pictogramme("vegan","vegan"),new Pictogramme("handicap","handicap")),
    // new Section(""),new Theme("",new Type("Pizzeria")),new Array(),new Array(),new Array(),);
    // let a2=new Activite("L'envie des mets","","",
    // "../../../assets/activities/test/test-activite.jpeg",
    // new Array(new Pictogramme("vegan","vegan"),new Pictogramme("handicap","handicap")),
    // new Section(""),new Theme("",new Type("Pizzeria")),new Array(),new Array(),new Array());
    // let a3=new Activite("L'envie des mets","","",
    // "../../../assets/activities/test/test-activite.jpeg",
    // new Array(new Pictogramme("vegan","vegan"),new Pictogramme("handicap","handicap")),
    // new Section(""),new Theme("",new Type("Pizzeria")),new Array(),new Array(),new Array());
    // let a4=new Activite("L'envie des mets","","",
    // "../../../assets/activities/test/test-activite.jpeg",
    // new Array(new Pictogramme("vegan","vegan"),new Pictogramme("handicap","handicap")),
    // new Section(""),new Theme("",new Type("Pizzeria")),new Array(),new Array(),new Array());
    // this.activites.push(a);
    // this.activites.push(a2);
    // this.activites.push(a3);
    // this.activites.push(a4);

  }
  resultTypeListe(): void{
    let opt1=document.getElementById("opt1");
    let opt2=document.getElementById("opt2");
    opt1?.setAttribute("style","background-color: var(--base); border-color: var(--first-pink); color: var(--first-pink);");
    opt2?.setAttribute("style","background-color: var(--first-pink); border-color: var(--first-pink); color: var(--base);");
    this.printListe=true;
  }
  resultTypeMap(): void{
    //#e3117c
    let opt1=document.getElementById("opt1");
    let opt2=document.getElementById("opt2");
    opt2?.setAttribute("style","background-color: var(--base); border-color: var(--first-pink); color: var(--first-pink);");
    opt1?.setAttribute("style","background-color: var(--first-pink); border-color: var(--first-pink); color: var(--base);");
    this.printListe=false;
  }
  result(): void{
    console.log("oui");
    if(this.chosen_item == "Map"){
      this.chosen_item = "Liste";
      this.resultTypeListe();
      console.log(this.chosen_item);
    }else if(this.chosen_item == "Liste"){
      this.chosen_item = "Map";
      this.resultTypeMap();
      console.log(this.chosen_item);
    }
  }
}
