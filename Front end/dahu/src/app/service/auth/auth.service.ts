import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs';
import { Utilisateur } from 'src/app/data/utilisateur/utilisateur';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly urlApi = "http://localhost:8000/api";

  constructor(private cookieService: CookieService,private http:HttpClient) {}

  setToken(token: string): void {
    // console.log(token)
    this.cookieService.set('jwtToken', token);
    // console.log(this.cookieService.get('jwtToken'))
  }

  getUtilisateur():Observable<Utilisateur>{
    let cookie = this.cookieService.get('jwtToken')
    if(cookie){
      // console.log("token : "+cookie)
      const httpOptions ={
        headers:new HttpHeaders({'Authorization': cookie})
      };
      return this.http.get<Utilisateur>(`${this.urlApi}/who`)
    }
    return of()
  }

  getToken(): string | undefined {
    return this.cookieService.get('jwtToken');
  }

  removeToken(): void {
    this.cookieService.delete('jwtToken');
  }
}
