import { Activite } from "../activite/activite";
import { Avis } from "../avis/avis";
import { Evenement } from "../evenement/evenement";
import { Quartier } from "../quartier/quartier";
import { Utilisateur } from "../utilisateur/utilisateur";


export class Parcours extends Evenement {
    activites: Array<Activite>;
    quartiers: Array<Quartier>;
 

    constructor(
        id:number,
        nom:string,
        description:string,
        image:string,
        avis: Array<Avis>,
        activites:Array<Activite>,
        quartiers:Array<Quartier>){

        super(nom,description,image,avis);
        this.activites=activites;
        this.quartiers=quartiers;
    }
}
