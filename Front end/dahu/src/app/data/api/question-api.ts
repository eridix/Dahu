import { Activite } from "../activite/activite";
import { Question } from "../question/question";
import { Utilisateur } from "../utilisateur/utilisateur";

export class QuestionApi {
  question:string;
  auteur:string;
  activite: string;
  pere:string|null;

  constructor(question:string,auteur:Utilisateur,activite: Activite,pere:Question|null=null){
    this.question=question;
    this.auteur="api/utilisateurs/"+auteur.id;
    if(pere){
      this.pere="api/questions/"+pere.id;
    }
    this.activite = "api/activites/"+activite.id;
}}
