import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Activite } from 'src/app/data/activite/activite';
import { ActiviteService } from 'src/app/service/activite/activite.service';
import { SectionService } from 'src/app/service/section/section.service';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-activite',
  templateUrl: './activite.component.html',
  styleUrls: ['./activite.component.css']
})
export class ActiviteComponent {
  fullStars: number = 0;
  emptyStars: number = 0;
  decimalPart: number = 0;
  activite:Activite | undefined;
  color:[string,string,string, string];
  utilisateurConnecte: boolean = false;

  constructor(
    private activiteService: ActiviteService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private sectionService:SectionService
  ) {}

  ngOnInit() {
    this.color=this.sectionService.getColor()
    this.utilisateurConnecte = this.authService.getToken() !== undefined;
    this.getActivite();
    
  }

  getActivite(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.activiteService.getActiviteById(Number(id))
        .subscribe(activite =>{ this.activite = activite;
        this.remplirStars()})
    }
  }

  
  remplirStars() : void {
    let moy:number = 0;
    if (this.activite?.moyenne) {
      moy = this.activite.moyenne;
    }

    this.fullStars = Math.floor(moy);
    this.decimalPart = moy - this.fullStars;

    // Calcul du nombre d'étoiles vides
    this.emptyStars = 5 - this.fullStars - 1;
  }

  getRange(value: number): number[] {
    return Array.from({ length: value });
  }

  
}
