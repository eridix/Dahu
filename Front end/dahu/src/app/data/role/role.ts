import { Utilisateur } from "../utilisateur/utilisateur";

export class Role {
    id:number;
    name:string;
    utilisateurs: Array<Utilisateur>;

    constructor(name:string, utilisateurs:Array<Utilisateur>=[]){
        this.name=name
        this.utilisateurs=utilisateurs;
    }
}
