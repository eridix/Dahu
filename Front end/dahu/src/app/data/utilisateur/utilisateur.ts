import { Role } from "../role/role";
import  { Actualite } from "../actualite/actualite"
import { Question } from "../question/question";
import { Avis } from "../avis/avis";

export class Utilisateur {
    id:number;
    nom:string;
    prenom:string;
    email:string;
    password:string;
    nbErreurs: number;
    role:Role|undefined;
    actualites:Array<Actualite>;
    questions: Array<Question>;
    avis: Array<Avis>;

    constructor(nom:string="",prenom:string="",email:string="",password:string="",nbErreurs: number=0,role:Role|undefined=undefined,actualites:Array<Actualite>=[],questions:Array<Question>=[],avis:Array<Avis>=[]){
        this.nom=nom;
        this.prenom=prenom;
        this.email=email;
        this.password=password;
        this.nbErreurs=nbErreurs;
        this.role=role;
        this.actualites=actualites;
        this.questions=questions;
        this.avis=avis;
    }
}
