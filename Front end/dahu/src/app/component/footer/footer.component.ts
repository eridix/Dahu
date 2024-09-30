import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SectionService } from 'src/app/service/section/section.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  color:[string,string,string ,string]


  constructor(private sectionService:SectionService,private router: Router){}

  ngOnInit(): void {
    this.color=this.sectionService.getColor()
  }

}
