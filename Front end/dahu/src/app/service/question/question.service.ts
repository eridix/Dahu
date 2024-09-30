import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap ,map} from 'rxjs';
import { Question } from 'src/app/data/question/question';
import { CookieService } from 'ngx-cookie-service';
import { QuestionApi } from 'src/app/data/api/question-api';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  readonly urlApi = "http://127.0.0.1:8000/api";
  constructor(private http:HttpClient,private cookieService: CookieService){}


  getQuestion():Observable<Question[]>{
    return this.http.get<Question>(`${this.urlApi}/questions`,{responseType: 'json'}).pipe(
      tap((response)=>{this.log(response)}),
      catchError((error=> this.handleError(error,[])))
    )
  }

  getQuestionById(QuestionId : number):Observable<Question|undefined>{
    return this.http.get<Question>(`${this.urlApi}/questions/${QuestionId}`).pipe(
      tap((response)=>this.log(response)),
      catchError((error=> this.handleError(error,undefined)))
    )
  }

  updateQuestion(Question:QuestionApi):Observable<Question|undefined>{
    let cookie = this.cookieService.get('jwtToken')
    if(cookie){
      console.log(cookie)
      const httpOptions ={
        headers:new HttpHeaders({'Content-Type': 'application/json','Authorization': cookie})
      };
      return this.http.patch(`${this.urlApi}/questions`,Question,httpOptions).pipe(
        tap((response) => this.log(response)),
        catchError((error=> this.handleError(error,null))));
    }else{
      return of()
    }
  }

  addQuestion(Question:QuestionApi):Observable<Question>{
    let cookie = this.cookieService.get('jwtToken')
    if(cookie){
      console.log(cookie)
      const httpOptions ={
        headers:new HttpHeaders({'Content-Type': 'application/json','Authorization': cookie})
      };
      return this.http.post<Question>(`${this.urlApi}/questions`, Question, httpOptions).pipe(
        tap((response) => this.log(response)),
        catchError((error=> this.handleError(error,null))));
    }else{
      return of()
    }
  }

  deleteQuestionById(QuestionId:number):Observable<any>{
    let cookie = this.cookieService.get('jwtToken')
    if(cookie){
      console.log(cookie)
      const httpOptions ={
        headers:new HttpHeaders({'Content-Type': 'application/json','Authorization': cookie})
      };
      return this.http.delete<any>(`${this.urlApi}/questions/${QuestionId}`).pipe(
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
