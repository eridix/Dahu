import { Section } from "../section/section";
import { Type } from "../type/type";

export class Theme {
    id:number;
    name:string;
    types: Array<Type>;
    section: Section;

    constructor(name:string,types:Array<Type>,section:Section){
        this.name=name;
        this.types=types;
        this.section=section;
    }
}
