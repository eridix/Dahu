import { Type } from "../type/type";

export class TypeApi {
  id:number;
  name:string;
  activites:Array<string>;
  image:string;
  constructor(type:Type){
    this.id=type.id
    this.name=type.name
    let activites_string:Array<string>=[]
    type.activites.forEach(element => {
      activites_string.push("api/activites/"+element.id)
    });
    this.activites=activites_string
    this.image="";
  }
}
