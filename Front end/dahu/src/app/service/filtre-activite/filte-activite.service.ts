import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, first, of, skip, switchMap } from 'rxjs';
import { Activite } from 'src/app/data/activite/activite';
import { TypeService } from '../type/type.service';
import { ActiviteService } from '../activite/activite.service';
import { SectionService } from '../section/section.service';
import { ThemeService } from '../theme/theme.service';

@Injectable({
  providedIn: 'root'
})
export class FilteActiviteService implements OnInit {
  activites$:BehaviorSubject<Activite[]>=new BehaviorSubject<Activite[]>([]);
  activites:Activite[]=[];
  types_id:number[]=[];
  pictos_id:number[]=[];
  theme_id:number;
  coup_de_coeur:boolean=false;


  constructor(private typeService:TypeService,private sectionService:SectionService,private themeService:ThemeService) {}

  ngOnInit(): void {
  }

  updateTheme(theme_id:number):Observable<undefined>{
    this.theme_id=theme_id
    this.activites=[]
    return this.themeService.getThemeById(this.theme_id).pipe(
      switchMap(theme => {
        theme.types.forEach(type => {
          type.activites.forEach(activite => {
            this.activites.push(activite);
          });
        });
        this.modifActivite();
        return of(undefined);
      })
    );
  }

  compareActiviteToPictos_id(activite:Activite){
    let i=0
    let y=0
    while(i<this.pictos_id.length && y!=activite.pictogrammes.length){
      y=0
      while(y<activite.pictogrammes.length && activite.pictogrammes[y].id!=this.pictos_id[i]){
        y++
      }
      i++
    }
    // console.log("i ="+i)
    // console.log("y ="+y)
    if(i==this.pictos_id.length && y!=activite.pictogrammes.length){//Coorespondance entre les types coché et l'activite
      this.activites.push(activite)
    }
  }

  getActivitesByTheme(){//Avec la gestion du coup de coeur
    this.activites=[]
    this.themeService.getThemeById(this.theme_id).subscribe(theme=>{
      theme.types.forEach(type => {
        type.activites.forEach(activite => {
          if(this.coup_de_coeur==false || this.isCoupDeCoeur(activite)){//Gestion du coup de coeur
            this.activites.push(activite)
          }
        });
      });
      this.modifActivite()
    })
  }

  addType(type_id:number){
    this.types_id.push(type_id);
    if(this.types_id.length==1 ){//Premier type coché
      this.activites=[]
    }
    this.typeService.getTypeById(type_id).subscribe(type => {
      if(type?.activites){
        type.activites.forEach(activite => {
          if((this.pictos_id.length==0 && this.coup_de_coeur==false) || (this.pictos_id.length==0 && this.isCoupDeCoeur(activite))){//Cas où il y a pas de type coché + gestion du coup de coeur
            this.activites.push(activite)
          }else if(this.coup_de_coeur==false || this.isCoupDeCoeur(activite)){//Cas où il y a des type(s) coché + gestion coup de coeur
            this.compareActiviteToPictos_id(activite)
          }
        });
        this.modifActivite()
      }})
  }

  delType(type_id: number): void {
    const indexToRemove = this.types_id.indexOf(type_id);
    if (indexToRemove !== -1) {
      this.types_id.splice(indexToRemove, 1);
      // console.log(this.types_id)
      if(this.types_id.length==0){//Cas où il n'y a plus de type coché
        this.activites=[]
        if(this.pictos_id.length==0){//Cas où il n'y pas de picto coché
          this.getActivitesByTheme()
        }else{//Cas où il y a des pictos coché
          this.themeService.getThemeById(this.theme_id).subscribe(theme=>{
            theme.types.forEach(type => {
              type.activites.forEach(activite => {
                if(this.coup_de_coeur==false || this.isCoupDeCoeur(activite)){//Gestion du coup de coeur
                  this.compareActiviteToPictos_id(activite)
                }
              });
            });
          })
        }

      }else{//Cas où il reste des types coché
        this.typeService.getTypeById(type_id).subscribe(type => {
          type?.activites.forEach(activite_A_SUPP => {
            let i=0
            while(i<this.activites.length && this.activites[i].id!=activite_A_SUPP.id){
              i++
            }
            // console.log(i)
            if(i!=this.activites.length){
              this.activites.splice(i,1)
            }
          });
        })
      }
    this.modifActivite()
    }
  }

  modifActivite(){
    this.activites$.next(this.activites)
  }

  addPicto(picto_id:number){
    this.pictos_id.push(picto_id);
    const activites =this.activites
    this.activites=[]
    if(this.pictos_id.length==1){//Si c'est le premier picto coché
      activites.forEach(activite => {
        if(this.coup_de_coeur==false || this.isCoupDeCoeur(activite)){//Gestion du coup de coeur
          this.compareActiviteToPictos_id(activite)
        }
      });
      this.modifActivite()
    }else{//Si il y a plusieurs pictos coché
      if(this.types_id.length==0){//Pas de type coché

          activites.forEach(activite => {
              if(this.coup_de_coeur==false || this.isCoupDeCoeur(activite)){//Gestion du coup de coeur
                this.compareActiviteToPictos_id(activite)
              }
            });

          this.activites=activites
          this.modifActivite()

      }else{//Types coché
        activites.forEach(activite => {
          if(this.coup_de_coeur==false || this.isCoupDeCoeur(activite)){//Gestion du coup de coeur
            this.compareActiviteToPictos_id(activite)
          }
        });
        this.modifActivite()
      }
    }
  }

  delPicto(picto_id: number): void {
    // console.log("DelPicto")
    const indexToRemove = this.pictos_id.indexOf(picto_id);
    // console.log(indexToRemove)
    if (indexToRemove !== -1) {
      this.pictos_id.splice(indexToRemove, 1);
      this.activites=[]
      if(this.types_id.length==0){//Pas de type
        if(this.pictos_id.length==0){//Cas où il n'y pas de picto coché
          this.getActivitesByTheme()
        }else{//Cas où il y a des pictos coché
          this.themeService.getThemeById(this.theme_id).subscribe(theme=>{
            theme.types.forEach(type => {
              type.activites.forEach(activite => {
                if(this.coup_de_coeur==false || this.isCoupDeCoeur(activite)){//Gestion du coup de coeur
                  this.compareActiviteToPictos_id(activite)
                }
              });
            });
          })
        }
      }else{//Types coché
        this.types_id.forEach(type_id => {
          this.typeService.getTypeById(type_id).subscribe(type => {
            if(type?.activites){
              type.activites.forEach(activite => {
                if(this.pictos_id.length==0 && (this.coup_de_coeur==false || this.isCoupDeCoeur(activite))){//Cas où il y a pas de type coché + gestion coup de coeur
                  // console.log(this.activites)
                  this.activites.push(activite)
                }else if(this.coup_de_coeur==false || this.isCoupDeCoeur(activite)){//Cas où il y a des type(s) coché + gestion du coup de coeur
                  this.compareActiviteToPictos_id(activite)
                }
              });
            }
          });
        });
      }
      console.log(this.activites)
      this.modifActivite()
    }
  }

  addCoeur(){
    this.coup_de_coeur=true
    const activites =this.activites
    this.activites=[]
    activites.forEach(activite => {
      if(this.isCoupDeCoeur(activite)){
        this.activites.push(activite)
      }
    });
    this.modifActivite()
  }

  delCoeur(){
    this.coup_de_coeur=false
    const types =this.types_id
    this.types_id=[]
    const pictos =this.pictos_id
    this.pictos_id=[]
    this.activites=[]
    types.forEach(type_id=>this.addType(type_id))
    pictos.forEach(picto_id=>this.addPicto(picto_id))
    this.modifActivite()
  }

  isCoupDeCoeur(activite:Activite):boolean{
    console.log(activite.coup_de_coeur)
    return activite.coup_de_coeur
  }

  resetTo0(){
    this.activites=[]
    this.types_id=[]
    this.pictos_id=[]
  }

}
