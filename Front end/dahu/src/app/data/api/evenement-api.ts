export abstract class EvenementApi {
  id: number;
  name: string;
  description: string;
  img : string;
  avis: Array<string>;

  constructor(nom:string,description:string,image:string,avis:Array<string>) {
      this.name = nom;
      this.description = description;
      this.img = image;
      this.avis=avis;
  }
}
