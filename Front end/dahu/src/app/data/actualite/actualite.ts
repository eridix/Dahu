import { Utilisateur } from "../utilisateur/utilisateur";

export class Actualite {
    id:number;
    titre:string;
    image:string;
    description:string;
    auteur:Utilisateur;

    constructor(titre:string,image:string,description:string,auteur:Utilisateur){
        this.titre=titre;
        this.image=image;
        this.description=description;
        this.auteur=auteur;
    }
}
