import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/Models/Product';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
  
})
export class ProductDetailComponent implements OnInit {

  selectedProduct:Product = undefined;

  

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private _productService:ProductService
  ) { }

  ngOnInit(): void {
    
    // SADECE İLK KEZ RENDER EDİLDİĞİNDE ÇALIŞIR.
    // let productID =+ this.route.snapshot.paramMap.get('id');
    // alert(productID);


    //HER GÖNDERİLEN ID DEĞİŞTİĞİNDE YAKALAR.
    this.route.paramMap.subscribe(params=>{
      let productID:number =+ params.get('id');
      this.GetProductById(productID);
      
    })
  }


  public GetProductById(productID:number){

    
    this.selectedProduct = undefined;
    this._productService.GetWithInclude(productID).subscribe(response=>{

      this.selectedProduct = response;
    }, error =>{

      this.selectedProduct = new Product(0);
    })
  }

}
