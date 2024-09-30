import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { ChoixDahuComponent } from './component/choix-dahu/choix-dahu.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { AccueilComponent } from './component/accueil/accueil.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ContactComponent} from "./component/contact/contact.component";
import { NavChoixComponent } from './component/nav-choix/nav-choix.component';
import { FooterComponent } from './component/footer/footer.component';
import { FiltresComponent } from './component/filtres/filtres.component';
import { ChoixDeLActiviteComponent } from './component/choix-de-lactivite/choix-de-lactivite.component';
import { ActiviteDetailComponent } from './component/activite-detail/activite-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SpinnerComponent } from './component/spinner/spinner/spinner.component';
import { ActiviteComponent } from './component/activite/activite.component';
import { AvisComponent } from './component/avis/avis.component';
import { MapComponent } from './component/map/map.component';
import { QuestionComponent } from './component/question/question.component';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from './interceptor/jwt.interceptor';
import { BackOfficeListeActiviteComponent } from './component/back-office/activite/back-office-liste-activite/back-office-liste-activite.component';
import { BackOfficeListeActualiteComponent } from './component/back-office/actualite/back-office-liste-actualite/back-office-liste-actualite.component';
import { BackOfficeCreateActiviteComponent } from './component/back-office/activite/back-office-create-activite/back-office-create-activite.component';
import { BackOfficeFormActiviteComponent } from './component/back-office/activite/back-office-form-activite/back-office-form-activite.component';
import { BackOfficeUpdateActiviteComponent } from './component/back-office/activite/back-office-update-activite/back-office-update-activite.component';
import { BackOfficeCreateActualiteComponent } from './component/back-office/actualite/back-office-create-actualite/back-office-create-actualite.component';
import { BackOfficeFormActualiteComponent } from './component/back-office/actualite/back-office-form-actualite/back-office-form-actualite.component';
import { BackOfficeUpdateActualiteComponent } from './component/back-office/actualite/back-office-update-actualite/back-office-update-actualite.component';
import { ActusComponent } from './component/actus/actus.component';
import { ArticleComponent } from './component/article/article.component';
import { MenuBackofficeComponent } from './component/back-office/menu-backoffice/menu-backoffice.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { CdTimerModule } from 'angular-cd-timer';
import {
  BackOfficeListeThemesComponent
} from "./component/back-office/themes/back-office-liste-themes/back-office-liste-themes.component";
import {
  BackOfficeFormThemeComponent
} from "./component/back-office/themes/back-office-form-theme/back-office-form-theme.component";
import {
  BackOfficeUpdateThemesComponent
} from "./component/back-office/themes/back-office-update-themes/back-office-update-themes.component";
import {
  BackOfficeCreateThemesComponent
} from "./component/back-office/themes/back-office-create-themes/back-office-create-themes.component";
import { EquipesComponent } from './component/equipes/equipes.component';
import { BackOfficeCreatePictoComponent } from './component/back-office/picto/back-office-create-picto/back-office-create-picto.component';
import { BackOfficeListePictoComponent } from './component/back-office/picto/back-office-liste-picto/back-office-liste-picto.component';
import { BackOfficeUpdatePictoComponent } from './component/back-office/picto/back-office-update-picto/back-office-update-picto.component';
import { BackOfficeFormPictoComponent } from './component/back-office/picto/back-office-form-picto/back-office-form-picto.component';
import { BackOfficeListeAvisComponent } from './component/back-office/avis/back-office-liste-avis/back-office-liste-avis.component';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    ChoixDahuComponent,
    NavBarComponent,
    AccueilComponent,
    NavChoixComponent,
    FooterComponent,
    ActusComponent,
    ArticleComponent,
    MenuBackofficeComponent,
    ContactComponent,
    SpinnerComponent,
    ActiviteComponent,
    AvisComponent,
    QuestionComponent,
    MapComponent,
    BackOfficeCreateActiviteComponent,
    BackOfficeFormActiviteComponent,
    BackOfficeUpdateActiviteComponent,
    BackOfficeListeActiviteComponent,
    BackOfficeCreateActiviteComponent,
    BackOfficeCreateActualiteComponent,
    BackOfficeFormActualiteComponent,
    BackOfficeUpdateActualiteComponent,
    BackOfficeListeActualiteComponent,
    BackOfficeCreatePictoComponent,
    BackOfficeListePictoComponent,
    BackOfficeUpdatePictoComponent,
    BackOfficeFormPictoComponent,
    BackOfficeListeAvisComponent,
    FiltresComponent,
    ActiviteDetailComponent,
    ChoixDeLActiviteComponent,
    BackOfficeListeThemesComponent,
    BackOfficeUpdateThemesComponent ,
    BackOfficeCreateThemesComponent,
    BackOfficeFormThemeComponent,
    EquipesComponent,
  ],
  imports: [
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    MatDialogModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    GoogleMapsModule,
    CdTimerModule,
    ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  exports: [
    MenuBackofficeComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
