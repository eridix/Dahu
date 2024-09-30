import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { UtilisateurService } from '../service/utilisateur/utilisateur.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(UtilisateurService); // Instanciez votre service d'authentification ici
  const router = new Router(); // Instanciez le routeur
  console.log(authService.isAdmin())
  if (authService.isAdmin()) {
    return true;
  }else{
      // router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    router.navigate(['/']);
    return false;
  }

};
