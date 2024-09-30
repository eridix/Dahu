import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { Activite } from 'src/app/data/activite/activite';
import { Pictogramme } from 'src/app/data/pictogramme/pictogramme';
import { Type } from 'src/app/data/type/type';
import { ActiviteService } from 'src/app/service/activite/activite.service';
import { AuthService } from 'src/app/service/auth/auth.service';
import { PictogrammeService } from 'src/app/service/pictogramme/pictogramme.service';
import { TypeService } from 'src/app/service/type/type.service';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { forbiddenNameValidator } from '../../../../data/validator/validator'
import { SectionService } from 'src/app/service/section/section.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-back-office-create-activite',
  templateUrl: './back-office-create-activite.component.html',
  styleUrl: './back-office-create-activite.component.css'
})
export class BackOfficeCreateActiviteComponent implements OnInit{
  activite:Activite
  types:Type[]
  pictos:Pictogramme[]


constructor(private typeService:TypeService,
  private activiteService:ActiviteService,
  private pictoService:PictogrammeService, 
  private sectionService:SectionService,
  private router:Router){
}

  ngOnInit(): void {
    this.activite=new Activite("",false,"","","",[],[],[],[],new Type(""),[],undefined,"");
  }
  
  goBack(): void{
    this.router.navigate([this.sectionService.getAdresseDahu()+'/back-office/activites']);
  }
}
