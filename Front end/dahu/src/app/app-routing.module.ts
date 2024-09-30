import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { ChoixDahuComponent } from './component/choix-dahu/choix-dahu.component';
import { AccueilComponent } from './component/accueil/accueil.component';
import {ContactComponent} from "./component/contact/contact.component";
import {InscriptionComponent} from "./component/inscription/inscription.component";
import { ActiviteComponent } from './component/activite/activite.component';
import { BackOfficeListeActiviteComponent } from './component/back-office/activite/back-office-liste-activite/back-office-liste-activite.component';
import { BackOfficeListeActualiteComponent } from './component/back-office/actualite/back-office-liste-actualite/back-office-liste-actualite.component';
import { BackOfficeCreateActiviteComponent } from './component/back-office/activite/back-office-create-activite/back-office-create-activite.component';
import { BackOfficeUpdateActiviteComponent } from './component/back-office/activite/back-office-update-activite/back-office-update-activite.component';
import { BackOfficeCreateActualiteComponent } from './component/back-office/actualite/back-office-create-actualite/back-office-create-actualite.component';
import { BackOfficeUpdateActualiteComponent } from './component/back-office/actualite/back-office-update-actualite/back-office-update-actualite.component';
import { ActusComponent } from './component/actus/actus.component';
import { ArticleComponent } from './component/article/article.component';
import { ChoixDeLActiviteComponent } from './component/choix-de-lactivite/choix-de-lactivite.component';
import { MapComponent } from './component/map/map.component';
import { DashboardComponent } from './component/back-office/dashboard/dashboard.component';
import { adminGuard } from './guard/admin.guard';
import {
  BackOfficeUpdateThemesComponent
} from "./component/back-office/themes/back-office-update-themes/back-office-update-themes.component";
import {
  BackOfficeListeThemesComponent
} from "./component/back-office/themes/back-office-liste-themes/back-office-liste-themes.component";
import { BackOfficeListePictoComponent } from './component/back-office/picto/back-office-liste-picto/back-office-liste-picto.component';
import { BackOfficeCreatePictoComponent } from './component/back-office/picto/back-office-create-picto/back-office-create-picto.component';
import { BackOfficeUpdatePictoComponent } from './component/back-office/picto/back-office-update-picto/back-office-update-picto.component';
import { BackOfficeFormPictoComponent } from './component/back-office/picto/back-office-form-picto/back-office-form-picto.component';
import { BackOfficeListeAvisComponent } from './component/back-office/avis/back-office-liste-avis/back-office-liste-avis.component';
import {
  BackOfficeCreateThemesComponent
} from "./component/back-office/themes/back-office-create-themes/back-office-create-themes.component";
import {
  BackOfficeFormThemeComponent
} from "./component/back-office/themes/back-office-form-theme/back-office-form-theme.component";
import {EquipesComponent} from "./component/equipes/equipes.component";


const routes: Routes = [
  {path: '', redirectTo: 'choix', pathMatch:'full'},
  {path: 'choix',component: ChoixDahuComponent},
  {path: 'dahu/accueil',component:AccueilComponent},
  {path: 'dahu-des-neiges/accueil',component:AccueilComponent},
  {path: 'dahu/contact',component: ContactComponent},
  {path: 'dahu-des-neiges/contact',component: ContactComponent},
  {path: 'dahu/activites/:id',component:ChoixDeLActiviteComponent},
  {path: 'dahu-des-neiges/activites/:id',component:ChoixDeLActiviteComponent},
  {path: 'dahu/activite/:id',component:ActiviteComponent},
  {path: 'dahu-des-neiges/activite/:id',component:ActiviteComponent},
  {path: 'dahu/actualites',component:ActusComponent},
  {path: 'dahu-des-neiges/actualites',component:ActusComponent},
  {path: 'dahu-des-neiges/article/:id',component:ArticleComponent},
  {path: 'dahu/article/:id',component:ArticleComponent},
  // {path: 'dahu/map',component:MapComponent},
  {path: 'dahu/back-office/create-activite', component:BackOfficeCreateActiviteComponent,canActivate:[adminGuard]},
  {path: 'dahu/back-office/update-activite/:id', component:BackOfficeUpdateActiviteComponent,canActivate:[adminGuard]},
  {path: 'dahu/back-office/activites', component:BackOfficeListeActiviteComponent,canActivate:[adminGuard]},
  {path: 'dahu/back-office/create-actualite', component:BackOfficeCreateActualiteComponent,canActivate:[adminGuard]},
  {path: 'dahu/back-office/update-actualite/:id', component:BackOfficeUpdateActualiteComponent,canActivate:[adminGuard]},
  {path: 'dahu/back-office/dashboard', component:DashboardComponent,canActivate:[adminGuard]},
  {path: 'dahu-des-neiges/back-office/dashboard', component:DashboardComponent,canActivate:[adminGuard]},
  {path: 'dahu/back-office/actualites', component:BackOfficeListeActualiteComponent,canActivate:[adminGuard]},
  {path: 'dahu/back-office/pictos', component:BackOfficeListePictoComponent,canActivate:[adminGuard]},
  {path: 'dahu/back-office/create-picto', component:BackOfficeCreatePictoComponent,canActivate:[adminGuard]},
  {path: 'dahu/back-office/update-picto/:id', component:BackOfficeUpdatePictoComponent,canActivate:[adminGuard]},
  {path: 'dahu/back-office/form-picto/:id', component:BackOfficeFormPictoComponent,canActivate:[adminGuard]},
  {path: 'dahu/back-office/avis', component:BackOfficeListeAvisComponent,canActivate:[adminGuard]},
  {path: 'dahu-des-neiges/back-office/create-activite', component:BackOfficeCreateActiviteComponent,canActivate:[adminGuard]},
  {path: 'dahu-des-neiges/back-office/update-activite/:id', component:BackOfficeUpdateActiviteComponent,canActivate:[adminGuard]},
  {path: 'dahu-des-neiges/back-office/activites', component:BackOfficeListeActiviteComponent,canActivate:[adminGuard]},
  {path: 'dahu-des-neiges/back-office/create-actualite', component:BackOfficeCreateActualiteComponent,canActivate:[adminGuard]},
  {path: 'dahu-des-neiges/back-office/update-actualite/:id', component:BackOfficeUpdateActualiteComponent,canActivate:[adminGuard]},
  {path: 'dahu-des-neiges/back-office/actualites', component:BackOfficeListeActualiteComponent,canActivate:[adminGuard]},
  {path: 'dahu/back-office/themes' , component: BackOfficeListeThemesComponent,canActivate:[adminGuard]} ,
  {path: 'dahu/back-office/update-themes/:id' , component: BackOfficeUpdateThemesComponent,canActivate:[adminGuard]} ,
  {path: 'dahu/back-office/create-theme' , component: BackOfficeCreateThemesComponent,canActivate:[adminGuard] } ,
  {path: 'dahu-des-neiges/back-office/themes' , component: BackOfficeListeThemesComponent,canActivate:[adminGuard] } ,
  {path: 'dahu-des-neiges/back-office/update-themes/:id' , component: BackOfficeUpdateThemesComponent,canActivate:[adminGuard] } ,
  {path: 'dahu-des-neiges/back-office/create-theme' , component: BackOfficeCreateThemesComponent,canActivate:[adminGuard] } ,
  {path: 'dahu/equipe'  , component: EquipesComponent } ,
  {path: 'dahu-des-neiges/back-office/pictos', component:BackOfficeListePictoComponent,canActivate:[adminGuard]},
  {path: 'dahu-des-neiges/back-office/create-picto', component:BackOfficeCreatePictoComponent,canActivate:[adminGuard]},
  {path: 'dahu-des-neiges/back-office/update-picto/:id', component:BackOfficeUpdatePictoComponent,canActivate:[adminGuard]},
  {path: 'dahu-des-neiges/back-office/form-picto/:id', component:BackOfficeFormPictoComponent,canActivate:[adminGuard]},
  {path: 'dahu-des-neiges/back-office/avis', component:BackOfficeListeAvisComponent,canActivate:[adminGuard]},
  {path: '**',component:PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
