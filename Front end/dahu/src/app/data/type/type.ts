import { Activite } from "../activite/activite";
import { Theme } from "../theme/theme";

export class Type {
    id:number;
    name:string;
    activites:Activite[];

    constructor(name:string){
        this.name=name;
        this.activites=[]
    }
}
