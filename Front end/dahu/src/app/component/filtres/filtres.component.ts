import { Component, OnDestroy, OnInit } from '@angular/core';
import { SectionService } from '../../service/section/section.service';
import { ActiviteService } from '../../service/activite/activite.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ThemeService } from 'src/app/service/theme/theme.service';
import { Type } from 'src/app/data/type/type';
import { PictogrammeService } from 'src/app/service/pictogramme/pictogramme.service';
import { Pictogramme } from 'src/app/data/pictogramme/pictogramme';
import { Subscription, debounceTime, first, throttleTime } from 'rxjs';
import { FilteActiviteService } from 'src/app/service/filtre-activite/filte-activite.service';

@Component({
  selector: 'app-filtres',
  templateUrl: './filtres.component.html',
  styleUrls: ['./filtres.component.css']
})
export class FiltresComponent implements OnInit,OnDestroy {
  private routeSubscription: Subscription;
  color:[string,string,string, string]
  types:Type[]
  pictos:Pictogramme[]
  theme_id:string | null
  param_types:number[]=[]
  param_pictos:number[]=[]
  coup_de_coeur:boolean

  constructor(private filtreService:FilteActiviteService,private pictoService:PictogrammeService,private router: Router,private sectionService:SectionService,private route:ActivatedRoute,private themeService:ThemeService){}

  ngOnInit(): void {
    this.routeSubscription =this.router.events.pipe(throttleTime(100),debounceTime(100) ).subscribe((event) => {
      console.log(this.theme_id+" "+this.route.snapshot.paramMap.get('id'))
      if(this.theme_id!=this.route.snapshot.paramMap.get('id')){//Si c'est un nouveau theme
        this.theme_id=this.route.snapshot.paramMap.get('id')
        if(this.theme_id){
          this.themeService.getThemeById(parseInt(this.theme_id)).pipe(first()).subscribe(theme=>this.types=theme.types)
          this.filtreService.updateTheme(parseInt(this.theme_id))

            this.route.queryParams.pipe(first()).subscribe(params => {
              if(this.param_types.length!=0){
                this.param_types.forEach(type_id => {
                  this.filtreService.delType(type_id)
                });
              }
              if(this.param_pictos.length!=0){
                this.param_pictos.forEach(picto_id => {
                  this.filtreService.delPicto(picto_id)
                });
              }
              if(this.coup_de_coeur){
                this.filtreService.delCoeur()
              }
              this.param_types=[]
              this.param_pictos=[]
              this.coup_de_coeur=false
              console.log(Array.isArray(params['types']))
              if(params['types'] && Array.isArray(params['types']) && params['types'].length>=2){//Cas où params['types'],les types en parametre de l'url est un tableau
                const types:string[]=params['types']

                types.forEach(type => {
                  this.addType(parseInt(type));
                  this.cocheType(parseInt(type));
                });
              }else if(params['types']){//Cas où params['types'] est un numbre seul
                const type:string=params['types']
                this.addType(parseInt(type));
                this.cocheType(parseInt(type));
              }
              if(params['pictos'] && Array.isArray(params['pictos']) && params['pictos'].length>=2){
                const types:string[]=params['pictos']
                console.log("test "+this.param_pictos)
                types.forEach(picto => {
                  this.addPicto(parseInt(picto));
                  this.cochePicto(parseInt(picto));
                });
              }else if(params['pictos']){
                const picto:string=params['pictos']
                this.addPicto(parseInt(picto));
                this.cochePicto(parseInt(picto));
              }
              if(params['coeur']){
                this.addCoupDeCoeur()
                this.cocheCoeur()
              }
              if(!params['types'] && !params['pictos'] && !params['coeur']){
                console.log("No types No pictos No coeur")
                this.filtreService.getActivitesByTheme()
              }
            });
        }
      }else{
        console.log("Reload")
      }

    })
    this.route.queryParams.subscribe(params => {
      if(this.theme_id==this.route.snapshot.paramMap.get('id')){
        if(params['types']&& Array.isArray(params['types']) && params['types'].length>=2){//Cas où params['types'],les types en parametre de l'url est un tableau
          const types:string[]=(params['types']);
          this.param_types=types.map(str => parseInt(str))
        }else if(params['types']){//Cas où params['types'] est un numbre seul
          const type:string=params['types']
          console.log(type)
          this.param_types=[parseInt(type)]
        }
        if(params['pictos'] && Array.isArray(params['pictos']) && params['pictos'].length>=2){//Cas où params['pictos'],les pictos en parametre de l'url est un tableau
          const pictos:string[]=(params['pictos']);
          this.param_pictos=pictos.map(str => parseInt(str))
        }else if(params['pictos']){//Cas où params['pictos'] est un numbre seul
          const picto:string=params['pictos']
          this.param_pictos=[parseInt(picto)]
        }
        if(params['coeur']){
          this.coup_de_coeur=true
        }
      }
    });
    this.pictoService.getPictogrammes().pipe(first()).subscribe(pictos => this.pictos=pictos)
    this.color=this.sectionService.getColor()
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  type(){
    if (document.getElementById("type")?.className=="typeO"){
      document.getElementById("type")?.classList.replace("typeO","typeC");
    }else{
      document.getElementById("type")?.classList.replace("typeC","typeO");
    }
  }
  picto(){
    if (document.getElementById("picto")?.className=="pictoO"){
      document.getElementById("picto")?.classList.replace("pictoO","pictoC");
    }else{
      document.getElementById("picto")?.classList.replace("pictoC","pictoO");
    }
  }

  addType(id:number){
    // console.log(id)
    if(this.param_types){
      let i=0
      while(i<this.param_types.length && id!==+(this.param_types.at(i)!)){
        i++
      }
      console.log(i + "length "+this.param_types.length + " is include "+ this.param_types.includes(id)+" types "+this.param_types )
      if(i==this.param_types.length){
        this.param_types.push(id)
        this.filtreService.addType(id)
        this.modifFiltre()
      }else{
        console.log(i)
        this.param_types.splice(i,1)
        this.filtreService.delType(id)
        this.modifFiltre()
      }
    }else{
      console.error("IMPOSIBLE")
      // this.param_types.push(id)
      // this.modifFiltre()
    }
  }

  addPicto(id:number){
    // console.log("test")
    // console.log(this.param_pictos)
    if(this.param_pictos){
      let i=0
      while(i<this.param_pictos.length && id!==+(this.param_pictos.at(i)!)){
        i++
      }
      if(i==this.param_pictos.length){
        this.param_pictos.push(id)
        this.filtreService.addPicto(id)
        this.modifFiltre()
      }else{
        console.log(i)
        this.param_pictos.splice(i,1)
        this.filtreService.delPicto(id)
        this.modifFiltre()
      }
    }else{
      console.error("IMPOSIBLE")
    }
  }

  addCoupDeCoeur(){
    if(this.coup_de_coeur){
      this.coup_de_coeur=false
      this.filtreService.delCoeur()
      this.modifFiltre()
    }else{
      this.coup_de_coeur=true
      this.filtreService.addCoeur()
      this.modifFiltre()
    }
  }

  modifFiltre(){
    // console.log('modifFiltre')
    let param_types:number[]|undefined={}=this.param_types
    let param_pictos:number[]|undefined={}=this.param_pictos
    let param_coeur:boolean|undefined=this.coup_de_coeur
    if(this.param_types.length==0){
      param_types=undefined
    }
    if(this.param_pictos.length==0){
      param_pictos=undefined
    }
    if(!this.coup_de_coeur){
      param_coeur=undefined
    }
    const navigationExtras = {
      queryParams: { types: param_types , pictos : param_pictos , coeur : param_coeur}
    };
    // console.log(this.param_types)
    // console.log(this.param_pictos)
    this.router.navigate([`/${this.sectionService.getAdresseDahu()}/activites/${this.theme_id}`], navigationExtras);
  }

  cocheType(id_type:number){
    let checkbox=document.getElementById("type"+id_type)
    console.log("Chexbox "+checkbox)
    if (checkbox instanceof HTMLInputElement) {
      // console.log("Cocher checkbox")
      checkbox.checked = true;
    }
  }

  cochePicto(id_picto:number){
    let checkbox=document.getElementById("picto"+id_picto)
    console.log("Chexbox "+checkbox)
    if (checkbox instanceof HTMLInputElement) {
      // console.log("Cocher checkbox")
      checkbox.checked = true;
    }
  }

  cocheCoeur(){
    let checkbox=document.getElementById("coup_de_coeur")
    if (checkbox instanceof HTMLInputElement) {
      // console.log("Cocher checkbox")
      checkbox.checked = true;
    }
  }

  estCocheType(id_type:number):boolean{
    // console.log(this.param_types)
    // console.log("Coché "+this.param_types+" "+id_type+" "+ this.param_types.includes(id_type))
    return this.param_types.includes(id_type)
  }

  estCochePicto(id_picto:number):boolean{
    return this.param_pictos.includes(id_picto)
  }

  estCocheCoupDeCoeur(){
    return this.coup_de_coeur
  }
}
