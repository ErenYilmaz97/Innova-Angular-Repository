import { Product } from "./Product";

export class Category{


    constructor(
        public id?:number,
        public name?:string,
        public description?:string,
        public created?:Date,

        //NAVIGATION PROPERTY
        public products?:Product[]
    ){}


    
}