import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, catchError, of, tap ,map} from 'rxjs';
import { Theme } from 'src/app/data/theme/theme';
import { SectionService } from '../section/section.service';
import { Section } from 'src/app/data/section/section';
import { CapacitorHttp } from '@capacitor/core';
import { CookieService } from 'ngx-cookie-service';
import { ThemeApi } from 'src/app/data/api/theme-api';
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  readonly urlApi = "http://127.0.0.1:8000/api";
  constructor(private http:HttpClient,private sectionService:SectionService,private cookieService: CookieService){}



  getThemes():Observable<Theme[]>{
    const options = {
      url: `${this.urlApi}/sections/`+this.sectionService.getID()+`/themes`,
      headers: { responseType: 'json' },
    };

    return this.http.get<Section>(`${this.urlApi}/sections/`+this.sectionService.getID()+`/themes`,{responseType: 'json'}).pipe(
      map(section => section.themes)
    )

  }

    getThemeById(ThemeId : number):Observable<Theme>{
    return this.http.get<Theme>(`${this.urlApi}/themes/${ThemeId}`).pipe(
      tap((response)=>this.log(response)),
      catchError((error=> this.handleError(error,undefined)))
    )
  }

  updateTheme(Theme:ThemeApi):Observable<Theme|undefined>{
    let cookie = this.cookieService.get('jwtToken')
    if(cookie){
      console.log(cookie)
      const httpOptions ={
        headers:new HttpHeaders({'Content-Type': 'application/json','Authorization': cookie})
      };
      return this.http.patch(`${this.urlApi}/themes/${Theme.id}`,Theme,httpOptions).pipe(
        tap((response) => this.log(response)),
        catchError((error=> this.handleError(error,null))));
    }else{
      return of()
    }
  }

  addTheme(Theme:ThemeApi):Observable<Theme>{
    let cookie = this.cookieService.get('jwtToken')
    if(cookie){
      console.log(cookie)
      const httpOptions ={
        headers:new HttpHeaders({'Content-Type': 'application/json','Authorization': cookie})
      };
      return this.http.post<Theme>(`${this.urlApi}/themes`, Theme, httpOptions).pipe(
        tap((response) => this.log(response)),
        catchError((error=> this.handleError(error,null))));
    }else{
      return of()
    }
  }

  deleteThemeById(ThemeId:number):Observable<any>{
    let cookie = this.cookieService.get('jwtToken')
    if(cookie){
      console.log(cookie)
      const httpOptions ={
        headers:new HttpHeaders({'Content-Type': 'application/json','Authorization': cookie})
      };
      return this.http.delete<any>(`${this.urlApi}/themes/${ThemeId}`).pipe(
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
    console.log(response)
  }

  private handleError(error:Error,errorValue:any){
    console.error(error);
    return of(errorValue);
  }
}
