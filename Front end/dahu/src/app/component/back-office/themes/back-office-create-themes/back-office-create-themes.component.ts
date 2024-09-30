import {Theme} from "../../../../data/theme/theme";
import {Component, Type} from "@angular/core";
import {TypeService} from "../../../../service/type/type.service";
import {ThemeService} from "../../../../service/theme/theme.service";
import { Router } from "@angular/router";
import { SectionService } from "src/app/service/section/section.service";
import { Section } from "src/app/data/section/section";

@Component({
  selector: 'app-back-office-create-themes',
  templateUrl: './back-office-create-themes.component.html',
  styleUrl: './back-office-create-themes.component.css'
})
export class BackOfficeCreateThemesComponent {
  theme: Theme
 // types:Type[]

  //protected readonly addThemeToAppStyles = addThemeToAppStyles;
  constructor(private router:Router,private typeService:TypeService,private themeservice:ThemeService,private sectionService:SectionService){
  }
  ngOnInit(): void {
    this.sectionService.getSectionById(this.sectionService.getID()!).subscribe(section=>{
      if(section!=undefined){
        this.theme=new Theme("New Theme",[],section);
      }
    }
)
  }

  goBack(): void{
    this.router.navigate([this.sectionService.getAdresseDahu()+'/back-office/themes']);
  }
}
