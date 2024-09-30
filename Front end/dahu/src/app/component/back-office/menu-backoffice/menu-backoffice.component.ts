import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SectionService } from 'src/app/service/section/section.service';
import { Input } from '@angular/core';

@Component({
  selector: 'app-menu-backoffice',
  templateUrl: './menu-backoffice.component.html',
  styleUrls: ['./menu-backoffice.component.css']
})
export class MenuBackofficeComponent {
  logo: string
  isChecked: boolean
  colors:[string,string,string, string]
  @Input() page: string;

  constructor(private sectionService:SectionService,private router: Router){

  }

  ngOnInit(): void {
    this.isChecked = this.sectionService.isDahu();
    this.colors = this.sectionService.getColor()
    this.logo = this.sectionService.getLogo()
  }

  switchDahu(){
    this.router.navigate([this.sectionService.switchDahu()])
  }

  goToDasboard(){
    this.router.navigate([this.sectionService.getAdresseDahu()+'/back-office/dashboard']);
  }

  goToListeActivite(){
    this.router.navigate([this.sectionService.getAdresseDahu()+'/back-office/activites']);
  }
  goToListeActualite(){
    this.router.navigate([this.sectionService.getAdresseDahu()+'/back-office/actualites']);
  }
  goToListePictos(){
    this.router.navigate([this.sectionService.getAdresseDahu()+'/back-office/pictos']);
  }
  goToListeAvis(){
    this.router.navigate([this.sectionService.getAdresseDahu()+'/back-office/avis']);
  }

  goToListeTheme(){
    this.router.navigate([this.sectionService.getAdresseDahu()+'/back-office/themes']);
  }

  backToSite(){
    this.router.navigate([this.sectionService.getAdresseDahu()+'/accueil'])
  }
}
