import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap ,map, switchMap, first} from 'rxjs';
import { Activite } from 'src/app/data/activite/activite';
import { SectionService } from '../section/section.service';
import { Section } from 'src/app/data/section/section';
import { CookieService } from 'ngx-cookie-service';
import { ActiviteApi } from 'src/app/data/api/activite-api';


@Injectable({
  providedIn: 'root'
})
export class ActiviteService {
  readonly urlApi = "http://127.0.0.1:8000/api";
  constructor(private http:HttpClient,private sectionService:SectionService,private cookieService: CookieService){}


  getActivites():Observable<Activite[]>{
    return this.http.get<Activite[]>(`${this.urlApi}/activites`,{responseType: 'json'}).pipe(
      tap((response)=>{this.log(response)}),
      catchError((error=> this.handleError(error,[])))
    )
  }

  getActivitesBySection():Observable<Activite[]>{
    console.log(this.sectionService.getID())
    return this.sectionService.id.pipe(switchMap(id=>{
      if(id){
        return this.http.get<Section>(`${this.urlApi}/sections/`+this.sectionService.getID()+`/activites`,{responseType: 'json'}).pipe(
          first(),
          map(section => section.activites),
          tap((response)=>{this.log(response)}),
          catchError((error=> this.handleError(error,[])))
        )
      }else{
        return of([])
      }
    }))
  }

  getActivitesBySectionID(section_id:number):Observable<Activite[]>{
    return this.http.get<Section>(`${this.urlApi}/sections/`+section_id+`/activites`,{responseType: 'json'}).pipe(
      map(section => section.activites),
      tap((response)=>{this.log(response)}),
      catchError((error=> this.handleError(error,[])))
    )
  }

  getActiviteById(ActiviteId : number):Observable<Activite|undefined>{
    return this.http.get<Activite>(`${this.urlApi}/activites/${ActiviteId}`).pipe(
      tap((response)=>this.log(response)),
      catchError((error=> this.handleError(error,undefined)))
    )
  }

  updateActivite(Activite:ActiviteApi):Observable<Activite>{
    let cookie = this.cookieService.get('jwtToken')
    if(cookie){
      console.log(cookie)
      const httpOptions ={
        headers:new HttpHeaders({'Content-Type': 'application/json','Authorization': cookie})
      };
      return this.http.patch<Activite>(`${this.urlApi}/activites/${Activite.id}`,Activite,httpOptions).pipe(
        tap((response) => this.log(response)),
        catchError((error=> this.handleError(error,null))));
    }else{
      return of()
    }
  }

  addActivite(Activite:ActiviteApi):Observable<ActiviteApi>{
    let cookie = this.cookieService.get('jwtToken')
    if(cookie){
      console.log(cookie)
      const httpOptions ={
        headers:new HttpHeaders({'Content-Type': 'application/json','Authorization': cookie})
      };
      return this.http.post<ActiviteApi>(`${this.urlApi}/activites`, Activite, httpOptions).pipe(
        tap((response) => this.log(response)),
        catchError((error=> this.handleError(error,null))));
    }else{
      return of()
    }
  }

  deleteActiviteById(ActiviteId:number):Observable<any>{
    let cookie = this.cookieService.get('jwtToken')
    if(cookie){
      console.log(cookie)
      const httpOptions ={
        headers:new HttpHeaders({'Authorization': cookie})
      };
      return this.http.delete<any>(`${this.urlApi}/activites/${ActiviteId}`).pipe(
        tap(() => console.log('Activite supprimée avec succès')),
        catchError(error => this.handleError(error, null))
      );
    }else{
      return of()
    }
  }

  searchActiviteListe(term:string){
    if(term.length<=1){
      return of([]);
    }
    return this.http.get(`${this.urlApi}/activites/${term}`).pipe(
      tap((ActiviteListe)=>this.log(ActiviteListe)),
      catchError((error=> this.handleError(error,[])))
    )
  }

  /*filtreActivite(activite: Activite): Observable<Activite>{
    return this.http.get(`${this.urlApi}/activites/`)
  }*/

  private log(response:any) {
    console.table(response)
  }

  private handleError(error:Error,errorValue:any){
    console.error(error);
    return of(errorValue);
  }
}
