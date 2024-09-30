import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap ,map} from 'rxjs';
import { Role } from 'src/app/data/role/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  readonly urlApi = "http://127.0.0.1:8000/api";
  constructor(private http:HttpClient){}


  getRoles():Observable<Role[]>{
    return this.http.get<Role>(`${this.urlApi}/activites`,{responseType: 'json'}).pipe(
      tap((response)=>{this.log(response)}),
      catchError((error=> this.handleError(error,[])))
    )
  }

  getRoleById(ActiviteId : number):Observable<Role|undefined>{
    return this.http.get<Role>(`${this.urlApi}/activites/${ActiviteId}`).pipe(
      tap((response)=>this.log(response)),
      catchError((error=> this.handleError(error,undefined)))
    )
  }

  updateRole(Role:Role):Observable<Role|undefined>{
    const httpOptions ={
      headers:new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.put(`${this.urlApi}/activites`,Role,httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error=> this.handleError(error,null))));
  }

  addRole(Role:Role):Observable<Role>{
      const httpOptions ={
        headers:new HttpHeaders({'Content-Type': 'application/json'})
      };
      return this.http.post<Role>(`${this.urlApi}/activites`, Role, httpOptions).pipe(
        tap((response) => this.log(response)),
        catchError((error=> this.handleError(error,null))));
    }

  deleteRoleById(RoleId:number):Observable<null>{
    return this.http.delete(`${this.urlApi}/activites/${RoleId}`).pipe(
      tap((response) => this.log(response)),
      catchError((error=> this.handleError(error,null))));
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
