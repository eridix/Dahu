import { Avis } from "../avis/avis";

export class Tag {
    id:number;
    description:string;
    isPositive:boolean;
    avis:Array<Avis>;

    constructor(description:string,positif:boolean,avis:Array<Avis>){
        this.description=description;
        this.isPositive=positif;
        this.avis=avis;
    }
}

export enum Tags {
    // On peut ici initialiser des valeurs associées
}