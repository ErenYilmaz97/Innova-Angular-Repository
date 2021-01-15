import { Category } from "./Category";

export class Product{

    constructor(

        public id?:number,
        public name?:string,
        public price?:number,
        public stock?:number,
        public description?:string,
        public categoryId?:number,
        public created?:Date,

        //NAVIGATION PROPERTY
        public category?:Category

    ){

        if(!this.categoryId)
            this.categoryId = 0;

        this.id = 0;
    }

    
}