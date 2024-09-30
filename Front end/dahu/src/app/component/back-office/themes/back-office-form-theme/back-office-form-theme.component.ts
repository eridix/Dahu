import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Theme} from "../../../../data/theme/theme";
import {Type} from "../../../../data/type/type";
import {ThemeService} from "../../../../service/theme/theme.service";
import {catchError} from "rxjs";
import {TypeService} from "../../../../service/type/type.service";
import { MatDialog } from '@angular/material/dialog';
import { ThemeApi } from 'src/app/data/api/theme-api';
import { TypeApi } from 'src/app/data/api/type-api';
import { ActivatedRoute, Router } from '@angular/router';
import { SectionService } from 'src/app/service/section/section.service';





@Component({
  selector: 'app-back-office-form-theme',
  templateUrl: './back-office-form-theme.component.html',
  styleUrl: './back-office-form-theme.component.css'
})
export class BackOfficeFormThemeComponent implements OnInit {
  @Input() theme:Theme
  @Input() is_create:boolean
  themeForm: FormGroup
  error:string
  typeForm: FormGroup


  constructor(private themeService:ThemeService ,private route: ActivatedRoute,private themeservice:ThemeService , private typeservice:TypeService, private dialog: MatDialog, private formBuilder: FormBuilder,private router:Router,private sectionService:SectionService){}

  ngOnInit(): void {
    this.themeForm= new FormGroup({
      titre: new FormControl(this.theme.name,Validators.compose([
        Validators.required, Validators.minLength(3)])),
    }, );
    this.typeForm= new FormGroup({
      titre: new FormControl(this.theme.types,Validators.compose([
        Validators.required, Validators.minLength(3)]))
    })
    this.themeForm = this.formBuilder.group({
      nouveauNom: ['', Validators.required]
    });
  }


  createType() {
    const nouveauNomControl = this.themeForm.get('nouveauNom');
    //null
    if (nouveauNomControl && nouveauNomControl.value) {
      const newTypeName: string = nouveauNomControl.value;

      if (newTypeName.trim() !== '') {
        const newType: TypeApi = new TypeApi(new Type(newTypeName));
        this.typeservice.addType(newType).subscribe(
          type => {
            console.log(type);
            // Ajoutez le nouveau type à la liste des types du thème
            this.theme.types.push(type);
            // Réinitialisez le champ de saisie
            nouveauNomControl.reset();
          },
          error => {
            console.error('Une erreur est survenue lors de la création du type :', error);
            // Gérez l'erreur, par exemple, affichez un message à l'utilisateur
          }
        );
      }
    }
  }



  createTheme(){
    this.themeservice.addTheme(new ThemeApi(this.theme)).subscribe(theme =>this.router.navigate([this.sectionService.getAdresseDahu()+'/back-office/themes']));
  }

  updateTheme(){
    this.themeservice.updateTheme(new ThemeApi(this.theme)).subscribe(theme => this.router.navigate([this.sectionService.getAdresseDahu()+'/back-office/themes']))
  }


  updateType(type:Type) {
    this.typeservice.updateType(new TypeApi(type)).subscribe(   type => console.log(type)); }




  deletetype(id:number){
    let suppr=confirm("Voulez-vous vraiment supprimer le sous-theme ");
    if(suppr){
      this.typeservice.deleteTypeById(id).subscribe();
    }
    if(!this.is_create){
        const id = this.route.snapshot.paramMap.get('id');
      if(id){
        this.themeService.getThemeById(Number(id)).subscribe(theme=>this.theme=theme)
      }
    }else{
      let i:number=0
      while(i<this.theme.types.length && this.theme.types.at(i)?.id!=id){
        i++
      }
      let theme:Theme=this.theme
      theme.types.splice(i)
      console.log(theme)
      this.theme=theme
    }
  }




}
