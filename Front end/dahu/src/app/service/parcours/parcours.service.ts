import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Parcours } from 'src/app/data/parcours/parcours';

@Injectable({
  providedIn: 'root'
})
export class ParcoursService {
  readonly urlApi = "http://localhost:8080/api";
  constructor(private http:HttpClient){}


  getParcours():Observable<Parcours[]>{
    return this.http.get<Parcours>(`${this.urlApi}/parcours`,{responseType: 'json'}).pipe(
      tap((response)=>{this.log(response)}),
      catchError((error=> this.handleError(error,[])))
    )
  }


  getParcoursById(ActiviteId : number):Observable<Parcours|undefined>{
    return this.http.get<Parcours>(`${this.urlApi}/parcours/${ActiviteId}`).pipe(
      tap((response)=>this.log(response)),
      catchError((error=> this.handleError(error,undefined)))
    )
  }

  updateParcours(Parcours:Parcours):Observable<Parcours|undefined>{
    const httpOptions ={
      headers:new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.put(`${this.urlApi}/parcours`,Parcours,httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error=> this.handleError(error,null))));
  }

  addParcours(Parcours:Parcours):Observable<Parcours>{
      const httpOptions ={
        headers:new HttpHeaders({'Content-Type': 'application/json'})
      };
      return this.http.post<Parcours>(`${this.urlApi}/parcours`, Parcours, httpOptions).pipe(
        tap((response) => this.log(response)),
        catchError((error=> this.handleError(error,null))));
    }

  deleteParcoursById(ParcoursId:number):Observable<null>{
    return this.http.delete(`${this.urlApi}/parcours/${ParcoursId}`).pipe(
      tap((response) => this.log(response)),
      catchError((error=> this.handleError(error,null))));
  }

  // searchActiviteListe(term:string){
  //   if(term.length<=1){
  //     return of([]);
  //   }
  //   return this.http.get(`${this.urlApi}/parcours/${term}`).pipe(
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
