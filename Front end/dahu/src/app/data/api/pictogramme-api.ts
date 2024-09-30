import { Pictogramme } from "../pictogramme/pictogramme";

export class PictogrammeApi {
  id:number
  name:string;
  img:string;
  activites: Array<string>;

  constructor(picto:Pictogramme){
    this.id=picto.id
    this.name=picto.name
    this.img=picto.img
    let activites_string:Array<string>=[]
    picto.activites.forEach(element => {
      activites_string.push("api/types/"+element.id)
    });
    this.activites=activites_string
  }
}
