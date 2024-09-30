import { Activite } from "../activite/activite";
import { Evenement } from "../evenement/evenement";
import { Parcours } from "../parcours/parcours";
import { Tag } from "../tag/tag";
import { Utilisateur } from "../utilisateur/utilisateur";
import { EvenementApi } from "./evenement-api";

export class AvisApi {
  id:number;
  note:number;
  avis:string;
  auteur:string;
  activite:string;
  parcours:string;
  tag:Array<string>;

  constructor(note:number,avis:string,auteur:Utilisateur,parcours:Parcours|undefined,activite:Activite|undefined,tags:Array<Tag>){
    this.note=note;
    this.avis=avis;
    this.auteur="api/utilisateurs/"+auteur.id;
    if(activite){
      this.activite="api/activites/"+activite.id;
    }
    if(parcours){
      this.parcours="api/parcours/"+parcours.id;
    }
    let tags_string:Array<string>=[]
    tags.forEach(element => {
      tags_string.push("api/tags/"+element.id)
    });
    this.tag=tags_string
  }
}
