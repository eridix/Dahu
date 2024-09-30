import { Avis } from "../avis/avis";
import { Question } from "../question/question";

export class Etat {
    nom: string;
    avis: Array<Avis>;
    questions: Array<Question>;


    constructor(nom:string,avis:Array<Avis>,questions:Array<Question>) {
        this.nom=nom;
        this.avis=avis;
        this.questions=questions;
    }
}






export enum Etats {
    accepte = 'Accepté',
    en_attente = 'En attente',
    refuse = 'Refusé', 
    signale = 'Signalé',
    pere_signale = 'Père signalé' 
}
