import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { Actualite } from 'src/app/data/actualite/actualite';
import { ActualiteApi } from 'src/app/data/api/actualite-api';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ActualiteService {
  readonly urlApi = "http://127.0.0.1:8000/api";
  constructor(private http:HttpClient,private cookieService: CookieService){}


  getActualites():Observable<Actualite[]>{
    return this.http.get<Actualite>(`${this.urlApi}/actualites`,{responseType: 'json'}).pipe(
      tap((response)=>{this.log(response)}),
      catchError((error=> this.handleError(error,[])))
    )
  }


  getActualiteById(ActualiteId : number):Observable<Actualite|undefined>{
    return this.http.get<Actualite>(`${this.urlApi}/actualites/${ActualiteId}`).pipe(
      tap((response)=>this.log(response)),
      catchError((error=> this.handleError(error,undefined)))
    )
  }

  updateActualite(actualite:ActualiteApi):Observable<Actualite>{
    let cookie = this.cookieService.get('jwtToken')
    if(cookie){
      console.log(cookie)
      const httpOptions ={
        headers:new HttpHeaders({'Content-Type': 'application/json','Authorization': cookie})
      };
      return this.http.patch<Actualite>(`${this.urlApi}/actualites/${actualite.id}`,actualite,httpOptions).pipe(
        tap((response) => this.log(response)),
        catchError((error=> this.handleError(error,null))));
    }else{
      return of()
    }
  }

  addActualite(actualite:ActualiteApi):Observable<ActualiteApi>{
    let cookie = this.cookieService.get('jwtToken')
    if(cookie){
      console.log(cookie)
      const httpOptions ={
        headers:new HttpHeaders({'Content-Type': 'application/json','Authorization': cookie})
      };
      return this.http.post<ActualiteApi>(`${this.urlApi}/actualites`, actualite, httpOptions).pipe(
        tap((response) => this.log(response)),
        catchError((error=> this.handleError(error,null))));
    }else{
      return of()
    }
  }

  deleteActualiteById(actualiteId:number):Observable<any>{
    let cookie = this.cookieService.get('jwtToken')
    if(cookie){
      console.log(cookie)
      const httpOptions ={
        headers:new HttpHeaders({'Authorization': cookie})
      };
      return this.http.delete<any>(`${this.urlApi}/Actualites/${actualiteId}`).pipe(
        tap(() => console.log('Actualite supprimée avec succès')),
        catchError(error => this.handleError(error, null))
      );
    }else{
      return of()
    }
  }

  // searchActualiteListe(term:string){
  //   if(term.length<=1){
  //     return of([]);
  //   }
  //   return this.http.get(`${this.urlApi}/actualites/${term}`).pipe(
  //     tap((ActualiteListe)=>this.log(ActualiteListe)),
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
