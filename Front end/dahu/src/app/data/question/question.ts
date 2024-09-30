import { Activite } from "../activite/activite";
import { Etat } from "../etat/etat";
import { Utilisateur } from "../utilisateur/utilisateur";

export class Question {
    id:number;
    question:string;
    auteur:Utilisateur;
    activite: Activite;
    pere:Question|null;    
    etat:Etat;

    constructor(question:string,auteur:Utilisateur,activite: Activite,pere:Question|null=null,etat:Etat){
        this.question=question;
        this.auteur=auteur;
        this.pere=pere;
        this.activite = activite;
        this.etat=etat;
    }
}
