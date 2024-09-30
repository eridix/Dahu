import { Parcours } from "../parcours/parcours";
import { Avis } from "../avis/avis";
import { Evenement } from "../evenement/evenement";
import { Quartier } from "../quartier/quartier";
import { Pictogramme } from "../pictogramme/pictogramme";
import { Question } from "../question/question";
import { Type } from "../type/type";



export class Activite extends Evenement {
    adresse: string;
    coup_de_coeur: boolean;
    parcours: Array<Parcours>;
    quartiers: Array<Quartier>;
    pictogrammes: Array<Pictogramme>;
    type: Type;
    question: Array<Question>;
    moyenne:number|undefined;
    telephone: string;


    constructor(
        adresse:string='',
        coup_de_coeur: boolean=false,
        nom:string='',
        description:string='',
        image:string='',
        avis: Array<Avis>=[],
        parcours:Array<Parcours>=[],
        quartiers:Array<Quartier>=[],
        pictogrammes: Array<Pictogramme>=[],
        type: Type=new Type(''),
        questions: Array<Question>=[],
        moyenne:number | undefined =undefined,
        telephone: string=''
        ){

        super(nom,description,image,avis);
        this.adresse=adresse;
        this.coup_de_coeur=coup_de_coeur;
        this.parcours=parcours;
        this.quartiers=quartiers;
        this.pictogrammes=pictogrammes;
        this.type=type;
        this.question=questions;
        this.moyenne= moyenne;
        this.telephone=telephone;
    }
}
