import { Component,Input, OnInit } from '@angular/core';
import { Pictogramme } from 'src/app/data/pictogramme/pictogramme';
import { PictogrammeService } from 'src/app/service/pictogramme/pictogramme.service';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { forbiddenNameValidator } from 'src/app/data/validator/validator';
import { catchError } from 'rxjs';
import { SectionService } from 'src/app/service/section/section.service';
import { Router } from '@angular/router';
import { PictogrammeApi } from 'src/app/data/api/pictogramme-api';

@Component({
  selector: 'app-back-office-form-picto',
  templateUrl: './back-office-form-picto.component.html',
  styleUrl: './back-office-form-picto.component.css'
})
export class BackOfficeFormPictoComponent implements OnInit {
  @Input() picto:Pictogramme
  @Input() is_create:boolean
  pictoForm: FormGroup
  error:string

  constructor(private pictoService:PictogrammeService,private sectionService:SectionService,private router:Router){}

  ngOnInit(): void {
    this.pictoForm= new FormGroup({
      nom: new FormControl(this.picto.name,Validators.compose([
        Validators.required, Validators.minLength(3)])),
      image: new FormControl(this.picto.img)
      }, { validators: forbiddenNameValidator(/bob/i)} );
  }

  /*postPicto(){
    this.pictoService.updatePictogramme(this.picto).pipe(
      catchError((error=> this.error="Modification non prise en compte"))
    )
  }*/

  updatePictoFromForm(){
    this.picto.name = this.pictoForm.get('nom')?.value;
    this.picto.img = this.pictoForm.get('image')?.value;
  }

  create(){
    this.updatePictoFromForm();
    let picto_add:PictogrammeApi=new PictogrammeApi(this.picto)
    this.pictoService.addPictogramme(picto_add).subscribe(picto =>{console.log(picto);this.goToListeActivite();});
  }

  update(){
    this.updatePictoFromForm();
    let picto_update:PictogrammeApi=new PictogrammeApi(this.picto)
    this.pictoService.updatePictogramme(picto_update).subscribe(picto => {console.log(picto);this.goToListeActivite();})
  }

  goToListeActivite(){
    this.router.navigate([this.sectionService.getAdresseDahu()+'/back-office/pictos']);
  }
}
