import { Actualite } from "../actualite/actualite";

export class ActualiteApi {
  id:number;
  titre:string;
  image:string;
  description:string;
  auteur:string;

  constructor(actualite:Actualite){
    this.id=actualite.id
    this.titre=actualite.titre
    this.image=actualite.image
    this.description=actualite.description
    this.auteur="api/utilisateurs/"+actualite.auteur.id
  }
}
