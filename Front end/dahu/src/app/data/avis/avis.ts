import { Utilisateur } from "../utilisateur/utilisateur";
import { Tag } from "../tag/tag";
import { Evenement } from "../evenement/evenement";
import { Etat } from "../etat/etat";

export class Avis {
    id:number;
    note:number;
    avis:string;
    auteur:Utilisateur;
    evenement:Evenement;
    tag:Array<Tag>;
    etat:Etat;

    constructor(note:number,avis:string,auteur:Utilisateur,evenement:Evenement,tag:Array<Tag>,etat:Etat){
        this.note=note;
        this.avis=avis;
        this.auteur=auteur;
        this.evenement=evenement;
        this.tag=tag;
        this.etat=etat;
    }
}
