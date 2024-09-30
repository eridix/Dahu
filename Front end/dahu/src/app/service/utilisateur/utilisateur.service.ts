import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Observer, catchError, delay, first, map, of, tap } from 'rxjs';
import { Utilisateur } from 'src/app/data/utilisateur/utilisateur';
import { PasswordService } from '../password/password.service';
import { AuthService } from '../auth/auth.service';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService implements OnInit{
  redirectUrl!: string; // où rediriger l'utilisateur après l'authentification ?
  readonly urlApi = "http://localhost:8000/api";
  public utilisateurSubject = new BehaviorSubject<Utilisateur|undefined>(undefined);
  public utilisateur = this.utilisateurSubject.asObservable();
  // private password:string;



  constructor(private http:HttpClient,private passwordService:PasswordService,private authService:AuthService,private tokenService:TokenService){}

  ngOnInit(): void {
  }



  // Une méthode de connexion
  login(email: string, password: string): Observable<boolean> {
    let hashPassword=this.passwordService.hashPassword(password);
    console.log("email : "+email + "  password : "+password+"  hashpassword = "+hashPassword)
    return this.tokenService.token(email,hashPassword).pipe(map((token)=>{
      if (token){
        this.authService.setToken(token.token);
        this.authService.getUtilisateur().pipe(first()).subscribe(utilisateur => {this.utilisateurSubject.next(utilisateur);console.log(utilisateur)})
        return true
      }
      return false
    }))

  }

  // Une méthode de déconnexion
  logout(): void {
    // this.password=""
    this.authService.setToken("");
    this.utilisateurSubject.next(undefined)
  }

  isConnecter():boolean{
    if(this.utilisateurSubject.getValue()){
      return true
    }
    return false
  }

  isAdmin(): boolean {
    const utilisateur = this.utilisateurSubject.getValue();
    return utilisateur?.role?.name === "ADMIN";
  }

  getUtilisateurs(){
    return this.http.get(`${this.urlApi}/utilisateurs`,
    {responseType: 'json'}).pipe(
      tap((response)=>this.log(response)),
      catchError((error=> this.handleError(error,[])))
    )
  }

  getUtilisateurById(UtilisateurId : number):Observable<Utilisateur|undefined>{
    return this.http.get<Utilisateur>(`${this.urlApi}/utilisateurs/${UtilisateurId}`).pipe(
      tap((response)=>this.log(response)),
      catchError((error=> this.handleError(error,undefined)))
    )
  }

  getUtilisateurByEmail(email : string):Observable<Utilisateur|undefined>{
    return this.http.get<Utilisateur>(`${this.urlApi}/utilisateurs/${email}`).pipe(
      map((utilisateur)=>{
        return utilisateur
      }),
    )
  }

  updateUtilisateur(Utilisateur:Utilisateur):Observable<Utilisateur|undefined>{
    const httpOptions ={
      headers:new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.put(`${this.urlApi}/utilisateurs`,Utilisateur,httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error=> this.handleError(error,null))));
  }

  addUtilisateur(utilisateur:Utilisateur):Observable<Utilisateur>{
      const httpOptions ={
        headers:new HttpHeaders({'Content-Type': 'application/json'})
      };
      const password=utilisateur.password
      const hashpassword=this.passwordService.hashPassword(password);
      console.log("password = "+ password+ " hashpassword = "+hashpassword)
      utilisateur.password=hashpassword
      let utilisateur_temp={
        "email":utilisateur.email,
        "plainPassword": hashpassword,
        "prenom": utilisateur.prenom,
        "nom": utilisateur.nom
      }
      return this.http.post<Utilisateur>(`${this.urlApi}/utilisateurs`, utilisateur_temp, httpOptions).pipe(
        first(),
        map(user => {
            this.utilisateurSubject.next(user);
            this.tokenService.token(utilisateur.email,utilisateur.password).pipe(map((token)=>{
              if (token){
                this.authService.setToken(token);
              }
            }))
            return user
        }),
        tap((response) => this.log(response)),
        catchError((error=> this.handleError(error,null))));
    }

  deleteUtilisateurById(UtilisateurId:number):Observable<null>{
    return this.http.delete(`${this.urlApi}/utilisateurs/${UtilisateurId}`).pipe(
      tap((response) => this.log(response)),
      catchError((error=> this.handleError(error,null))));
  }

  searchUtilisateurListe(term:string){
    if(term.length<=1){
      return of([]);
    }
    return this.http.get(`${this.urlApi}/utilisateurs/${term}`).pipe(
      tap((UtilisateurListe)=>this.log(UtilisateurListe)),
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
