import { Activite } from "../activite/activite";
import { Parcours } from "../parcours/parcours";
import { Section } from "../section/section";

export class Quartier {
    id: number;
    adresse: string;
    nom:string;
    activite:Activite;
    parcours:Parcours;
    section:Section;


    constructor(id:number,adresse:string,nom:string,activite:Activite,parcours:Parcours,section:Section) {
        this.id=id;
        this.adresse=adresse;
        this.nom=nom;
        this.activite=activite;
        this.parcours=parcours;
        this.section=section;
    }
}
