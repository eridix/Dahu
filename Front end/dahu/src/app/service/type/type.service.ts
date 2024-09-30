import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap ,map} from 'rxjs';
import { Type } from 'src/app/data/type/type';
import { CookieService } from 'ngx-cookie-service';
import { TypeApi } from 'src/app/data/api/type-api';

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  readonly urlApi = "http://127.0.0.1:8000/api";
  constructor(private http:HttpClient,private cookieService: CookieService){}


  getTypes():Observable<Type[]>{
    return this.http.get<Type>(`${this.urlApi}/types`,{responseType: 'json'}).pipe(
      tap((response)=>{this.log(response)}),
      catchError((error=> this.handleError(error,[])))
    )
  }

  getTypeById(TypeId : number):Observable<Type|undefined>{
    return this.http.get<Type>(`${this.urlApi}/types/${TypeId}`).pipe(
      tap((response)=>this.log(response)),
      catchError((error=> this.handleError(error,undefined)))
    )
  }

  updateType(Type:TypeApi):Observable<Type|undefined>{
    let cookie = this.cookieService.get('jwtToken')
    if(cookie){
      console.log(cookie)
      const httpOptions ={
        headers:new HttpHeaders({'Content-Type': 'application/json','Authorization': cookie})
      };
      return this.http.patch(`${this.urlApi}/types/${Type.id}`,Type,httpOptions).pipe(
        tap((response) => this.log(response)),
        catchError((error=> this.handleError(error,null))));
    }else{
      return of()
    }
  }

  addType(Type:TypeApi):Observable<Type>{
    let cookie = this.cookieService.get('jwtToken')
    if(cookie){
      console.log(cookie)
      const httpOptions ={
        headers:new HttpHeaders({'Content-Type': 'application/json','Authorization': cookie})
      };
      return this.http.post<Type>(`${this.urlApi}/types`, Type, httpOptions).pipe(
        tap((response) => this.log(response)),
        catchError((error=> this.handleError(error,null))));
    }else{
      return of()
    }
  }

  deleteTypeById(TypeId:number):Observable<any>{
    let cookie = this.cookieService.get('jwtToken')
    if(cookie){
      console.log(cookie)
      const httpOptions ={
        headers:new HttpHeaders({'Content-Type': 'application/json','Authorization': cookie})
      };
      return this.http.delete<any>(`${this.urlApi}/types/${TypeId}`).pipe(
        tap((response) => this.log(response)),
        catchError((error=> this.handleError(error,null))));
    }else{
      return of()
    }

  }

  searchTypeListe(term:string){
    if(term.length<=1){
      return of([]);
    }
    return this.http.get(`${this.urlApi}/types/${term}`).pipe(
      tap((TypeListe)=>this.log(TypeListe)),
      catchError((error=> this.handleError(error,[])))
    )
  }

  private log(response:any) {
    console.table(response)
  }

  private handleError(error:Error,errorValue:any){
    console.error(error);
    return of(errorValue);
  }
}
