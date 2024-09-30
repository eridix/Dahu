import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Actualite } from 'src/app/data/actualite/actualite';
import { ActualiteService } from 'src/app/service/actualite/actualite.service';
import { catchError, first } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { forbiddenNameValidator } from 'src/app/data/validator/validator';
import { ActiviteApi } from 'src/app/data/api/activite-api';
import { ActualiteApi } from 'src/app/data/api/actualite-api';
import { Router } from '@angular/router';
import { SectionService } from 'src/app/service/section/section.service';

@Component({
  selector: 'app-back-office-form-actualite',
  templateUrl: './back-office-form-actualite.component.html',
  styleUrl: './back-office-form-actualite.component.css'
})
export class BackOfficeFormActualiteComponent {
  @Input() actualite:Actualite
  @Input() is_create:boolean
  actualiteForm: FormGroup
  error:string

  constructor(private actualiteService:ActualiteService,private router: Router,private sectionService:SectionService){}

  ngOnInit(): void {
    this.actualiteForm= new FormGroup({
      titre: new FormControl(this.actualite.titre,Validators.compose([
        Validators.required, Validators.minLength(3)])),
      description: new FormControl(this.actualite.description, Validators.compose([
        Validators.required]))
      }, { validators: forbiddenNameValidator(/bob/i)} );
  }

  postActualite(){
    let actualite_update:ActualiteApi=new ActualiteApi(this.actualite)
    this.actualiteService.updateActualite(actualite_update).pipe(
      catchError((error=> this.error="Modification non prise en compte"))
    )
  }

  updateActualiteFromForm() {
    this.actualite.titre = this.actualiteForm.get('titre')?.value;
    this.actualite.description = this.actualiteForm.get('description')?.value;
  }

  create(){
    this.updateActualiteFromForm()
    let actualite_update:ActualiteApi=new ActualiteApi(this.actualite)
    this.actualiteService.addActualite(actualite_update).subscribe(actualite =>{console.log(actualite);this.goToListeActualite()});
  }

  update(){
    this.updateActualiteFromForm()
    let actualite_update:ActualiteApi=new ActualiteApi(this.actualite)
    this.actualiteService.updateActualite(actualite_update).subscribe(actualite => {console.log(actualite);this.goToListeActualite()})
  }

  goToListeActualite(){
    this.router.navigate([this.sectionService.getAdresseDahu()+'/back-office/actualites']);
  }
}
