import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {Theme} from "../../../../data/theme/theme";
import {ThemeService} from "../../../../service/theme/theme.service";
import {Router} from "@angular/router";
import {ActualiteService} from "../../../../service/actualite/actualite.service";
import {SectionService} from "../../../../service/section/section.service";

@Component({
  selector: 'app-back-office-liste-themes',
  templateUrl: './back-office-liste-themes.component.html',
  styleUrl: './back-office-liste-themes.component.css'
})
export class BackOfficeListeThemesComponent  implements OnInit {

  themes: Theme[] = []


  constructor( private themeService: ThemeService ,   private router: Router,   private sectionService:SectionService ) {
  }


  ngOnInit() {
    this.themeService.getThemes().subscribe(themes => {this.themes=themes;console.log(this.themes)});
  }

  deleteTheme(id: number, name: string) {
    let suppr = confirm("Voulez-vous vraiment supprimer le thème " + name);
    if (suppr) {
      this.themeService.deleteThemeById(id).subscribe(() => {
        // Filtrer le thème supprimé de la liste actuelle des thèmes
        this.themes = this.themes.filter(theme => theme.id !== id);
      });
    }
  }


  updateTheme(id:number){
    this.router.navigate([this.sectionService.getAdresseDahu()+'/back-office/update-themes/'+id])
  }

  createTheme(){
    this.router.navigate([this.sectionService.getAdresseDahu()+'/back-office/create-theme'])
  }

}
