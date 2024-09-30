import { Activite } from "../activite/activite";

export class Pictogramme {
    id:number;
    name:string;
    img:string;
    activites: Array<Activite>;

    constructor(name:string,image:string,activites:Array<Activite>){
        this.name=name;
        this.img=image;
        this.activites=activites;
    }
}
