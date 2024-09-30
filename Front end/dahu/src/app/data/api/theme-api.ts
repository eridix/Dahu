import { Theme } from "../theme/theme";

export class ThemeApi {
  id:number
  name:string;
  types: Array<string>;
  section: string;
  constructor(theme:Theme){
    this.id=theme.id
    this.name=theme.name
    this.section="api/sections/"+theme.section.id
    let types_string:Array<string>=[]
    theme.types.forEach(element => {
      types_string.push("api/types/"+element.id)
    });
    this.types=types_string
  }
}
