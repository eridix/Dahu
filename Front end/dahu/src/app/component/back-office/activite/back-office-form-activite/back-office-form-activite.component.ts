import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Activite } from 'src/app/data/activite/activite';
import { ActiviteService } from 'src/app/service/activite/activite.service';
import { catchError, first } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { forbiddenNameValidator } from 'src/app/data/validator/validator';
import { TypeService } from 'src/app/service/type/type.service';
import { PictogrammeService } from 'src/app/service/pictogramme/pictogramme.service';
import { Type } from 'src/app/data/type/type';
import { Pictogramme } from 'src/app/data/pictogramme/pictogramme';
import { ActiviteApi } from 'src/app/data/api/activite-api';
import { SectionService } from 'src/app/service/section/section.service';
import { Router } from '@angular/router';
import { ImageService } from 'src/app/service/image/image.service';
import { ImageApi } from 'src/app/data/api/image-api';

@Component({
  selector: 'app-back-office-form-activite',
  templateUrl: './back-office-form-activite.component.html',
  styleUrl: './back-office-form-activite.component.css'
})
export class BackOfficeFormActiviteComponent implements OnInit {
  @Input() activite:Activite
  @Input() is_create:boolean
  activiteForm: FormGroup
  error:string
  types:Type[]
  pictos:Pictogramme[]
  image:string

  constructor(private imageService:ImageService,private typeService:TypeService,private router: Router,private activiteService:ActiviteService,private pictoService:PictogrammeService,private sectionService:SectionService){}

  ngOnInit(): void {
    console.log(this.activite)
    this.activiteForm= new FormGroup({
      nom: new FormControl(this.activite.name,Validators.compose([
        Validators.required, Validators.minLength(3)])),
      adresse: new FormControl(this.activite.adresse, Validators.compose([
        Validators.required])),
      telephone: new FormControl(this.activite.telephone, Validators.compose([
        Validators.required])),
      image: new FormControl(this.activite.img),
      description: new FormControl(this.activite.description),
      pictos: new FormControl(this.activite.pictogrammes),
      types: new FormControl(this.activite.type.name)
      });
    this.typeService.getTypes().pipe(first()).subscribe(types=>{
      this.types=types
      this.activiteForm.controls['types'].setValue(this.activite.type.id, {onlySelf: true});

      if(this.activite.type.name==""){
        this.activite.type=types[0]
      }
    })
    this.pictoService.getPictogrammes().pipe(first()).subscribe(pictos => this.pictos=pictos)
    if(this.is_create){
      this.activite.coup_de_coeur=false
    }
  }

  updateActiviteFromForm() {
    this.activite.name = this.activiteForm.get('nom')?.value;
    this.activite.adresse = this.activiteForm.get('adresse')?.value;
    this.activite.telephone = this.activiteForm.get('telephone')?.value;
    this.activite.description = this.activiteForm.get('description')?.value;
    this.activite.type.name = this.activiteForm.get('types')?.value;
  }

  create(){
    this.updateActiviteFromForm()
    console.log("create activite")
    let section_id=this.sectionService.getID()
    if(section_id){
      let activite_add:ActiviteApi=new ActiviteApi(this.activite,section_id)
      this.activiteService.addActivite(activite_add).subscribe(activite =>{console.log(activite);this.goToListeActivite()});
    }else{
      this.error="Pas de section"
    }

  }

  update(){
    this.updateActiviteFromForm()
    let section_id=this.sectionService.getID()
    console.log(this.activite)
    if(section_id){
      let activite_update:ActiviteApi=new ActiviteApi(this.activite,section_id)
      this.activiteService.updateActivite(activite_update).subscribe(activite => {console.log(activite);this.goToListeActivite()})
    }else{
      this.error="Pas de section"
    }
  }

  goToListeActivite(){
    this.router.navigate([this.sectionService.getAdresseDahu()+'/back-office/activites']);
  }

  is_picto_check(picto_id:number):boolean{
    let i=0
    while(i<this.activite.pictogrammes.length && this.activite.pictogrammes.at(i)?.id!=picto_id){
      //console.log(this.activite.pictogrammes.at(i))
      i++
    }
    //console.log(i!=this.activite.pictogrammes.length)
    return i!=this.activite.pictogrammes.length
  }

  picto_change(picto:Pictogramme){
    if(this.is_picto_check(picto.id)){
      const id_supp=this.activite.pictogrammes.findIndex(p => p.id==picto.id)
      console.log(id_supp)
      this.activite.pictogrammes.splice(id_supp,1)
    }else{
      this.activite.pictogrammes.push(picto)
    }
    let i=0;
    while(i<this.activite.pictogrammes.length){
      console.log(this.activite.pictogrammes.at(i)?.name);
      i++;
    }
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      console.log(event)
      const file = event.target.files[0];
      console.log(file)
      this.imageService.postImage(file).subscribe(imageapi=>{
        this.activite.img= this.imageService.linkToBackend(imageapi)
      })

    }
  }

}
