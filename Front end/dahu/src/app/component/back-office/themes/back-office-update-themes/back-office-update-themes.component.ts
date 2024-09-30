import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SectionService} from "../../../../service/section/section.service";
import {Observable} from "rxjs";
import {ThemeService} from "../../../../service/theme/theme.service";
import {Theme} from "../../../../data/theme/theme";
import {Type} from "../../../../data/type/type";
import {TypeService} from "../../../../service/type/type.service";
import {BackOfficeFormThemeComponent} from "../back-office-form-theme/back-office-form-theme.component";


@Component({
  selector: 'app-back-office-update-themes',
  templateUrl: './back-office-update-themes.component.html',
  styleUrl: './back-office-update-themes.component.css'
})
export class BackOfficeUpdateThemesComponent implements OnInit{
  theme:Theme
  themeobservable:Observable<Theme|undefined>
  types: Type[] = []

  constructor(private typeService:TypeService ,private themeService:ThemeService ,private route: ActivatedRoute,private router:Router,private sectionService:SectionService){}

  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.themeobservable=this.themeService.getThemeById(Number(id))
    }
  }
  goBack(): void{
    this.router.navigate([this.sectionService.getAdresseDahu()+'/back-office/themes']);
  }


  protected readonly Type = Type;
}
