import { Avis } from "../avis/avis";

export abstract class Evenement {
    id: number;
    name: string;
    description: string;
    img : string;
    avis: Array<Avis>;

    constructor(nom:string,description:string,image:string,avis:Array<Avis>) {
        this.name = nom;
        this.description = description;
        this.img = image;
        this.avis=avis;
    }
}
