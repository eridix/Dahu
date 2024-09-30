import { Activite } from "../activite/activite";
import { Theme } from "../theme/theme";

export class Section {
    id:number;
    name:string;
    themes:Theme[];
    activites:Activite[];

    constructor(name:string){
        this.name=name
    }
}
