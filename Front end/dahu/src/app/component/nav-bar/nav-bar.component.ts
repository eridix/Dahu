import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Theme } from 'src/app/data/theme/theme';
import { Type } from 'src/app/data/type/type';
import { Utilisateur } from 'src/app/data/utilisateur/utilisateur';
import { ActiviteService } from 'src/app/service/activite/activite.service';
import { SectionService } from 'src/app/service/section/section.service';
import { ThemeService } from 'src/app/service/theme/theme.service';
import { TypeService } from 'src/app/service/type/type.service';
import { UtilisateurService } from 'src/app/service/utilisateur/utilisateur.service';
import { LoginComponent } from '../login/login.component';
import { InscriptionComponent } from '../inscription/inscription.component';
import { FilteActiviteService } from 'src/app/service/filtre-activite/filte-activite.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  color:[string,string,string, string];
  types:Type[];
  logo: string
  logo2: string
  nameOtherSection: string
  themes:Theme[]
  user_connecter:Utilisateur|undefined
  sectionName: string

  constructor(private route:ActivatedRoute,public dialog:MatDialog,private filtreService:FilteActiviteService,private utilisateurService:UtilisateurService,private activiteService:ActiviteService,private themeService:ThemeService,private sectionService:SectionService,private router: Router,private typeService:TypeService){}

  ngOnInit(): void {
    this.color=this.sectionService.getColor();
    // this.typeService.getTypes().subscribe((types)=>{this.types=types;console.log(this.types)})
    this.logo = this.sectionService.getLogo()
    this.logo2 = this.sectionService.getLogo2()
    this.nameOtherSection = this.sectionService.getNameOther()
    this.themeService.getThemes().subscribe(temp=>{this.themes=temp;console.log(this.themes)})
    this.utilisateurService.utilisateur.subscribe(utilisateur =>this.user_connecter=utilisateur)
    this.sectionName = this.sectionService.sectionName
  }
  switchDahu(){
    this.router.navigate([this.sectionService.switchDahu()])
  }
  onMouseOver(event: MouseEvent): void {
    (event.target as HTMLAnchorElement).style.backgroundColor = this.color[2];  // Remplacez 'red' par votre couleur souhaitée
  }

  onMouseOut(event: MouseEvent): void {
    (event.target as HTMLAnchorElement).style.backgroundColor = "var(--base)";  // Réinitialisez la couleur au survol
  }

  goAccueil(){
    this.router.navigate([this.sectionService.getAdresseDahu()+'/accueil']);
  }


  goActualite(){
    this.router.navigate([this.sectionService.getAdresseDahu()+'/actualites']);
  }

  goContact(){
    this.router.navigate([this.sectionService.getAdresseDahu()+'/contact']);
  }

  goEquipe(){
    this.router.navigate([this.sectionService.getAdresseDahu()+'/equipe']);
  }

  goActivite(id_theme:number,id_type:number){//
    const navigationExtras = {
      queryParams: { types: id_type }
    };
    this.filtreService.resetTo0()
    console.log(this.route.snapshot.url)
    if(this.route.snapshot.url.at(2)?.path==id_theme.toString()){
      console.log("nav-bar add type")
      this.filtreService.addType(id_type)
    }
    this.router.navigate([this.sectionService.getAdresseDahu()+'/activites/'+id_theme], navigationExtras);
  }

  goBackOffice(){
    this.router.navigate([this.sectionService.getAdresseDahu()+"/back-office"+'/dashboard'])
  }

  openDialogConnection(): void {
    const dialogConfig = new MatDialogConfig();

    //dialogConfig.disableClose = true;
    //dialogConfig.autoFocus = true;
    dialogConfig.data ={utilisateurService:this.utilisateurService,create_user:false}
    const dialogRef = this.dialog.open(LoginComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      this.utilisateurService = data.utilisateurService;
      if(data.create_user){
        this.openDialogCreateUser()
      }
    });
  }

  openDialogCreateUser():void {
    const dialogConfig = new MatDialogConfig();
   // dialogConfig.height = '700px';
    //dialogConfig.width = '5000px';
    //dialogConfig.maxHeight = '100%';
    //dialogConfig.disableClose = true;
    //dialogConfig.autoFocus = true;
    dialogConfig.data ={utilisateurService:this.utilisateurService,login:false}
    const dialogRef = this.dialog.open(InscriptionComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      this.utilisateurService = data.utilisateurService;
      if(data.login){
        this.openDialogConnection()
      }
    });
  }
  selectActivity(){
    this.router.navigate([this.sectionService.getAdresseDahu()+'choix-de-lactivite']);
  }

  changerCompte(){
    this.utilisateurService.logout()
    this.openDialogConnection()
  }

  deconnection(){
    this.utilisateurService.logout()
  }
}
