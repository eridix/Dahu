import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { UtilisateurService } from './service/utilisateur/utilisateur.service';

@Injectable({
  providedIn: 'root'
})
export class utilisateurGuard implements CanActivate {

  constructor(private utilservice:UtilisateurService,private router:Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {
      if(this.utilservice.isLoggedIn){
        return true;
      }
      this.router.navigate(['/login']);
    return false;
  }
  
}