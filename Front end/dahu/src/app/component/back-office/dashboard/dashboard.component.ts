import { Component } from '@angular/core';
import { SectionService } from 'src/app/service/section/section.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-dashboard',

  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent  {
  constructor(private sectionService:SectionService,private router: Router){

  }

  activite() {
    this.router.navigate([this.sectionService.getAdresseDahu() + '/back-office/activites']);
  }

  actualite() {
    this.router.navigate([this.sectionService.getAdresseDahu() + '/back-office/actualites']);
  }

  theme() {
    this.router.navigate([this.sectionService.getAdresseDahu() + '/back-office/themes']);
  }

  utilisateur() {
    this.router.navigate([this.sectionService.getAdresseDahu() + '']);
  }
  pictogrammes(){
    this.router.navigate([this.sectionService.getAdresseDahu()+'/back-office/pictos']);
  }
  goToListeAvis(){
    this.router.navigate([this.sectionService.getAdresseDahu()+'/back-office/avis']);
  }
}





