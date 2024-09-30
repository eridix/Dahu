import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap ,map} from 'rxjs';
import { Pictogramme } from 'src/app/data/pictogramme/pictogramme';
import { PictogrammeApi } from 'src/app/data/api/pictogramme-api';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class PictogrammeService {
  readonly urlApi = "http://127.0.0.1:8000/api";
  constructor(private http:HttpClient,private cookieService: CookieService){}


  getPictogrammes():Observable<Pictogramme[]>{
    return this.http.get<Pictogramme>(`${this.urlApi}/pictogrammes`,{responseType: 'json'}).pipe(
      tap((response)=>{this.log(response)}),
      catchError((error=> this.handleError(error,[])))
    )
  }

  getPictogrammeById(PictogrammeId : number):Observable<Pictogramme|undefined>{
    return this.http.get<Pictogramme>(`${this.urlApi}/pictogrammes/${PictogrammeId}`).pipe(
      tap((response)=>this.log(response)),
      catchError((error=> this.handleError(error,undefined)))
    )
  }

  updatePictogramme(Pictogramme:PictogrammeApi):Observable<Pictogramme|undefined>{
    let cookie = this.cookieService.get('jwtToken')
    if(cookie){
      const httpOptions ={
        headers:new HttpHeaders({'Content-Type': 'application/json','Authorization': cookie})
      };
      return this.http.patch(`${this.urlApi}/pictogrammes/${Pictogramme.id}`,Pictogramme,httpOptions).pipe(
        tap((response) => this.log(response)),
        catchError((error=> this.handleError(error,null))));
    }else{
      return of();
    }
  }

  addPictogramme(Pictogramme:PictogrammeApi):Observable<Pictogramme>{
    let cookie = this.cookieService.get('jwtToken')
    if(cookie){
      const httpOptions ={
        headers:new HttpHeaders({'Content-Type': 'application/json','Authorization': cookie})
      };
            return this.http.post<Pictogramme>(`${this.urlApi}/pictogrammes`, Pictogramme, httpOptions).pipe(
        tap((response) => this.log(response)),
        catchError((error=> this.handleError(error,null))));
    }else{
      return of();
    }
  }

  deletePictogrammeById(PictogrammeId:number):Observable<null>{
    let cookie = this.cookieService.get('jwtToken')
    if(cookie){
      console.log(cookie)
      const httpOptions ={
        headers:new HttpHeaders({'Authorization': cookie})
      };
    return this.http.delete(`${this.urlApi}/pictogrammes/${PictogrammeId}`,httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error=> this.handleError(error,null))));
    }else{
      return of()
    }
  }

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
