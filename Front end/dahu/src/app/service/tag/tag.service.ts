import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap ,map} from 'rxjs';
import { Tag } from 'src/app/data/tag/tag';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  readonly urlApi = "http://127.0.0.1:8000/api";
  constructor(private http:HttpClient){}


  getTags():Observable<Tag[]>{
    return this.http.get<Tag>(`${this.urlApi}/tags`,{responseType: 'json'}).pipe(
      tap((response)=>{this.log(response)}),
      catchError((error=> this.handleError(error,[])))
    )
  }

  getTagById(TagId : number):Observable<Tag|undefined>{
    return this.http.get<Tag>(`${this.urlApi}/tags/${TagId}`).pipe(
      tap((response)=>this.log(response)),
      catchError((error=> this.handleError(error,undefined)))
    )
  }

  updateTag(Tag:Tag):Observable<Tag|undefined>{
    const httpOptions ={
      headers:new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.put(`${this.urlApi}/tags`,Tag,httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error=> this.handleError(error,null))));
  }

  addTag(Tag:Tag):Observable<Tag>{
      const httpOptions ={
        headers:new HttpHeaders({'Content-Type': 'application/json'})
      };
      return this.http.post<Tag>(`${this.urlApi}/tags`, Tag, httpOptions).pipe(
        tap((response) => this.log(response)),
        catchError((error=> this.handleError(error,null))));
    }

  deleteTagById(TagId:number):Observable<null>{
    return this.http.delete(`${this.urlApi}/tags/${TagId}`).pipe(
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
