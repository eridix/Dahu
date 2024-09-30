import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Activite } from 'src/app/data/activite/activite';
import { Avis } from 'src/app/data/avis/avis';
import { Etat, Etats } from 'src/app/data/etat/etat';
import { Tag } from 'src/app/data/tag/tag';
import { AvisService } from 'src/app/service/avis/avis.service';
import { UtilisateurService } from 'src/app/service/utilisateur/utilisateur.service';
import { LoginComponent } from '../login/login.component';
import { InscriptionComponent } from '../inscription/inscription.component';
import { AvisApi } from 'src/app/data/api/avis-api';
import { ActiviteApi } from 'src/app/data/api/activite-api';
import { SectionService } from 'src/app/service/section/section.service';
import { TagService } from 'src/app/service/tag/tag.service';
import { first, map } from 'rxjs';
import { ActiviteService } from 'src/app/service/activite/activite.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-avis',
  templateUrl: './avis.component.html',
  styleUrls: ['./avis.component.css']
})
export class AvisComponent implements OnInit {
  @Input() avis: Avis[];
  @Input() activite:Activite;
  selectedTags: Tag[] = [];
  noteSelectionne: number=0;
  avisEcrit: string='';
  tags:Tag[];
  color:[string,string,string, string];

  constructor(
    private activiteService: ActiviteService,
    private route: ActivatedRoute,
    public dialog:MatDialog,
    private utilisateurService:UtilisateurService,
    private avisService:AvisService,
    private tagService:TagService, 
    private sectionService:SectionService){}

  ngOnInit(): void {
    this.tagService.getTags().pipe(first()).subscribe(tags =>{this.tags=tags;console.log(tags)})
    this.color=this.sectionService.getColor()
  }

  onSubmit() {
    if(this.utilisateurService.isConnecter()){
      console.log('Avis:', this.avis);
      console.log('Tags séléctionnés:', this.selectedTags);
      this.utilisateurService.utilisateurSubject.subscribe(utilisateur=>{
        if(utilisateur){
          this.avisService.addAvis(new AvisApi(this.noteSelectionne,this.avisEcrit,utilisateur,undefined,this.activite,this.selectedTags)).subscribe(()=>{
            const id = this.route.snapshot.paramMap.get('id');
            if (id) {
              this.activiteService.getActiviteById(Number(id)).subscribe(activite =>{
                 this.avis = activite?.avis!;
              })
            }
          })
        }
      })
    }else{
      this.openDialogConnection()
    }

  }

  openDialogConnection(): void {
    const dialogConfig = new MatDialogConfig();

    //dialogConfig.disableClose = true;
    //dialogConfig.autoFocus = true;
    dialogConfig.data ={utilisateurService:this.utilisateurService,create_user:false}
    const dialogRef = this.dialog.open(LoginComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      this.utilisateurService = data.utilisateurService;
      if(data.create_user){
        this.openDialogCreateUser()
      }
    });
  }

  openDialogCreateUser():void {
    const dialogConfig = new MatDialogConfig();
   // dialogConfig.height = '700px';
    //dialogConfig.width = '5000px';
    //dialogConfig.maxHeight = '100%';
    //dialogConfig.disableClose = true;
    //dialogConfig.autoFocus = true;
    dialogConfig.data ={utilisateurService:this.utilisateurService,login:false}
    const dialogRef = this.dialog.open(InscriptionComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      this.utilisateurService = data.utilisateurService;
      if(data.login){
        this.openDialogConnection()
      }
    });
  }

  selectionnerNote(note: number): void {
    this.noteSelectionne = note;
  }

  getRange(value: number): number[] {
    return Array.from({ length: value });
  }


  tag_change(tag:Tag){
    if(this.selectedTags.includes(tag)){
      const id_supp=this.selectedTags.findIndex(t => t.id==tag.id);
      this.selectedTags.slice(id_supp);
    }else{
      this.selectedTags.push(tag)
    }
  }
}


