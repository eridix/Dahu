import { Component, OnInit } from '@angular/core';
import { Pictogramme } from 'src/app/data/pictogramme/pictogramme';
import { PictogrammeService } from 'src/app/service/pictogramme/pictogramme.service';
import { SectionService } from 'src/app/service/section/section.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-office-create-picto',
  
  templateUrl: './back-office-create-picto.component.html',
  styleUrl: './back-office-create-picto.component.css'
})
export class BackOfficeCreatePictoComponent implements OnInit {
  picto:Pictogramme;

  constructor(private pictoService:PictogrammeService,private router:Router,private sectionService:SectionService){
  }
  
  ngOnInit(): void {
    this.picto=new Pictogramme("","",[]);
  }
  goBack(): void{
    this.router.navigate([this.sectionService.getAdresseDahu()+'/back-office/pictos']);
  }
}
