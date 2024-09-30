import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, first, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  readonly urlApi = "http://localhost:8000";

  constructor(private http:HttpClient) { }

  token(email:string,password:string):Observable<any>{
    return this.http.post<any>(`${this.urlApi}/authentication_token`,{email:email,password:password}).pipe(
      tap((response)=>console.log("token = "+response)),
      catchError((error=> this.handleError(error,undefined)))
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
