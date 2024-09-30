import { Activite } from "../activite/activite";
import { Avis } from "../avis/avis";
import { EvenementApi } from "./evenement-api";

export class ActiviteApi extends EvenementApi {
  adresse: string;
  coup_de_coeur: boolean;
  parcours: Array<string>;
  quartiers: Array<string>;
  pictogrammes: Array<string>;
  type: string;
  question: Array<string>;
  moyenne: number | undefined;
  section:string;
  telephone:string;

  constructor(activite:Activite,section_id:number) {
      let avis:Array<string>=[]
      activite.avis.forEach(element => {
        avis.push("api/avis/"+element.id)
      });
      let parcours_string:Array<string>=[]
      activite.parcours.forEach(element => {
        parcours_string.push("api/parcours/"+element.id)
      });
      let pictogrammes_string:Array<string>=[]
      activite.pictogrammes.forEach(element => {
        pictogrammes_string.push("api/pictogrammes/"+element.id)
      });
      let questions_string:Array<string>=[]
      activite.question.forEach(element => {
        questions_string.push("api/questions/"+element.id)
      });
      super(activite.name, activite.description, activite.img, avis);
      this.id=activite.id
      this.adresse = activite.adresse;
      this.coup_de_coeur = activite.coup_de_coeur;
      this.parcours = parcours_string;
      this.quartiers = [];
      this.pictogrammes = pictogrammes_string;
      this.type = "api/types/"+activite.type.id;
      this.question = questions_string;
      this.moyenne = activite.moyenne;
      this.section= "api/sections/"+section_id;
      this.telephone= activite.telephone
  }

}
