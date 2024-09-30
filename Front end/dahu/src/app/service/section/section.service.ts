import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap ,map, BehaviorSubject} from 'rxjs';
import { Section } from 'src/app/data/section/section';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Activite } from 'src/app/data/activite/activite';

@Injectable({
  providedIn: 'root'
})
export class SectionService {
  readonly urlApi = "http://127.0.0.1:8000/api";
  sectionName:string;
  route:string;
  id:BehaviorSubject<number|undefined>=new BehaviorSubject<number|undefined>(undefined)

  constructor(private http:HttpClient,private router: Router){
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if(event.url.substring(1,16)=="dahu-des-neiges"){
          console.log("test")
          this.id.next(2)
          this.sectionName="dahu-des-neiges"
          this.route=event.url.substring(16)
        }else if(event.url.substring(1,5)=="dahu"){
          this.id.next(1)
          this.sectionName="dahu"
          this.route=event.url.substring(5)
        }else{
          this.sectionName=""
          this.id.next(0)
        }
      }
    });
  }

  isDahu(): boolean {
    console.log(this.sectionName)
    return this.sectionName=== 'dahu';
  }

  isDahuDesNeiges(): boolean{
    return this.sectionName=== 'dahu-des-neiges';
  }

  getAdresseDahu():string{
    if(this.isDahu()){
      return "dahu"
    }else if(this.isDahuDesNeiges()){
      return "dahu-des-neiges"
    }else{
      return ""
    }
  }

  getID():number|undefined{
    return this.id.getValue()
  }

  switchDahu():string{
    console.log(this.route)
    if(this.isDahuDesNeiges()){
      if(this.route.substring(1,10)=="activites"){
        return "dahu/accueil"
      }else if(this.route.substring(1,9)=="activite"){
        return "dahu/accueil"
      }else if(this.route.substring(1,28)=="back-office/update-activite" || this.route.substring(1,28)=="back-office/create-activite"){
        return "dahu/back-office/activites"
      }else if(this.route.substring(1,28)=="back-office/update-actualite" || this.route.substring(1,28)=="back-office/create-actualite"){
        return "dahu/back-office/actualites"
      }else if(this.route.substring(1,28)=="back-office/update-theme" || this.route.substring(1,28)=="back-office/create-theme"){
        return "dahu/back-office/themes"
      }else if(this.route.substring(1,28)=="back-office/update-picto" || this.route.substring(1,28)=="back-office/create-picto"){
        return "dahu/back-office/pictos"
      }else{
        return "dahu"+this.route
      }
    }else if(this.isDahu()){
      if(this.route.substring(1,10)=="activites"){
        return "dahu-des-neiges/accueil"
      }else if(this.route.substring(1,9)=="activite"){
        return "dahu-des-neiges/accueil"
      }else if(this.route.substring(1,7)=="equipe"){
        return "dahu-des-neiges/accueil"
      }else if(this.route.substring(1,28)=="back-office/update-activite" || this.route.substring(1,28)=="back-office/create-activite"){
        return "dahu-des-neiges/back-office/activites"
      }else if(this.route.substring(1,28)=="back-office/update-actualite" || this.route.substring(1,28)=="back-office/create-actualite"){
        return "dahu-des-neiges/back-office/actualites"
      }else if(this.route.substring(1,28)=="back-office/update-theme" || this.route.substring(1,28)=="back-office/create-theme"){
        return "dahu-des-neiges/back-office/themes"
      }else if(this.route.substring(1,28)=="back-office/update-picto" || this.route.substring(1,28)=="back-office/create-picto"){
        return "dahu-des-neiges/back-office/pictos"
      }else{
        return "dahu-des-neiges"+this.route
      }
    }
    return ""
  }

  getColor():[string,string,string, string]{
    if(this.isDahu()){
      return ['#E3117C','#E790AE','#EDB8C5','rgba(231, 144, 174, 0.75)']
    }else if(this.isDahuDesNeiges()){
      return ['#1B386F','#5E7A9E','#8BA6C1', 'rgba(94, 122, 158, 0.75)']
    }
    console.log("Erreur pas de dahu");
    return ['#000000','#000000','#000000','#000000']
  }

  getImageAccueil():string{
    if(this.isDahu()){
      return "accueil-bg.jpg"
    }else if(this.isDahuDesNeiges()){
      return "accueil-bg-neiges.jpg"
    }
    console.log("Erreur pas de dahu");
    return ""
  }

  getLogo():string{
    if(this.isDahu()){
      return "dahu.png"
    }else if(this.isDahuDesNeiges()){
      return "dahuDesNeiges.png"
    }
    console.log("Erreur pas de dahu");
    return ""
  }
  getLogo2():string{
    if(this.isDahu()){
      return "dahuDesNeiges2.png"
    }else if(this.isDahuDesNeiges()){
      return "dahu2.png"
    }
    console.log("Erreur pas de dahu");
    return ""
  }

  getNameOther(){
    if(this.isDahu()){
      return "Dahu des Neiges"
    }else if(this.isDahuDesNeiges()){
      return "Dahu"
    }
    console.log("Erreur pas de dahu");
    return ""
  }

  //Sevice client

  // getSection():Observable<Section[]>{
  //   return this.http.get<HydraResponse>(`${this.urlApi}/activites`,{responseType: 'json'}).pipe(map((response)=> {return response['hydra:member']}))
  //     // tap((response)=>{this.log(response)}),
  //     // catchError((error=> this.handleError(error,[])))
  // }

  getSectionById(Id:number):Observable<Section|undefined>{
    return this.http.get<Section>(`${this.urlApi}/sections/${Id}`).pipe(
      tap((response)=>this.log(response)),
      catchError((error=> this.handleError(error,undefined)))
    )
  }

  getSectionByName(SectionName : string):Observable<Section|undefined>{
    return this.http.get<Section>(`${this.urlApi}/sections?name=${SectionName}`).pipe(
      tap((response)=>this.log(response)),
      catchError((error=> this.handleError(error,undefined)))
    )
  }

  getSectionActivite():Observable<Observable<Activite[]|undefined>>{
    console.log(this.id.getValue())
    if(this.id.getValue()){
      return this.id.pipe(map(id =>{
        return this.http.get<Section>(`${this.urlApi}/sections/${this.getID()}/activites`).pipe(
          tap((response)=>console.log(response)),
          catchError((error=> this.handleError(error,undefined)))
        )}
      ))
    }
    return of(of())
  }


  // updateActivite(Activite:Activite):Observable<Activite|undefined>{
  //   const httpOptions ={
  //     headers:new HttpHeaders({'Content-Type': 'application/json'})
  //   };
  //   return this.http.put(`${this.urlApi}/activites`,Activite,httpOptions).pipe(
  //     tap((response) => this.log(response)),
  //     catchError((error=> this.handleError(error,null))));
  // }

  // addActivite(Activite:Activite):Observable<Activite>{
  //     const httpOptions ={
  //       headers:new HttpHeaders({'Content-Type': 'application/json'})
  //     };
  //     return this.http.post<Activite>(`${this.urlApi}/activites`, Activite, httpOptions).pipe(
  //       tap((response) => this.log(response)),
  //       catchError((error=> this.handleError(error,null))));
  //   }

  // deleteActiviteById(ActiviteId:number):Observable<null>{
  //   return this.http.delete(`${this.urlApi}/activites/${ActiviteId}`).pipe(
  //     tap((response) => this.log(response)),
  //     catchError((error=> this.handleError(error,null))));
  // }

  // searchActiviteListe(term:string){
  //   if(term.length<=1){
  //     return of([]);
  //   }
  //   return this.http.get(`${this.urlApi}/activites/${term}`).pipe(
  //     tap((ActiviteListe)=>this.log(ActiviteListe)),
  //     catchError((error=> this.handleError(error,[])))
  //   )
  // }

  private log(response:any) {
    console.table(response)
  }

  private handleError(error:Error,errorValue:any){
    console.error(error);
    return of(errorValue);
  }
}

