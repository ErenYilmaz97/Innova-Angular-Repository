import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/Models/Category';
import { Product } from 'src/app/Models/Product';
import { CategoryService } from 'src/app/Services/category.service';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'product-page',
  templateUrl: './product-page.component.html',
  
})
export class ProductPageComponent implements OnInit {

  products:Product[];
  categories:Category[];
  
  selectedProductID:number = 0;


  //DELETE
  responseError:string = undefined;
  selectedProduct:Product = new Product();

  constructor(
    private _productService:ProductService,
    private _categoryService:CategoryService,
    private _modalService:NgbModal,
    private toast:ToastrService

  ) { }

  ngOnInit(): void {

    this.GetAllProductsWithInclude();
    this.GetAllCategories();
    
  }


  public GetAllProductsWithInclude(){

    this._productService.GetallWithInclude().subscribe(response=>{

      this.products = response;
    }, error=>{

      console.log(error.error);
    })
  }


  public GetAllCategories(){

    this._categoryService.GetAllWithInclude().subscribe(response=>{

      this.categories = response;
    }, error=>{

      console.log(error.error);
    })
  }


  public OpenEditModal(productID:number,editProductModal){

    this.selectedProductID = productID;
    const modalRef = this._modalService.open(editProductModal);
  }


  public CloseEditModal(){

    this._modalService.dismissAll();
  }



  public OpenDeleteModal(productID:number,deleteProductModal){

    this.responseError = undefined;
    this.selectedProductID = productID;

    this._productService.GetWithInclude(this.selectedProductID).subscribe(response=>{

      this.selectedProduct = response;
      const modalRef = this._modalService.open(deleteProductModal);

      
    },error =>{
 
      this.responseError = error.error;
      const modalRef = this._modalService.open(deleteProductModal);
    })

  }


  public DeleteProduct(){

    this._productService.Delete(this.selectedProduct.id).subscribe(response=>{

      this.toast.success("Ürün Başarıyla Silindi.");
      this._modalService.dismissAll();
      this.GetAllProductsWithInclude();
    }, error =>{

      this.responseError = error.error;
    })
  }



  public SetSelectedProductID(productID:number){

    this.selectedProductID = productID;
  }



  public GetProductsByName(searchText:string){

    if(searchText == "" || searchText == null){

      this.GetAllProductsWithInclude();
    }

    else{

      this._productService.GetByName(searchText).subscribe(response=>{

        this.products = response;
      }, error =>{
  
        alert("Ürünler Listelenirken Bir Hata Oluştu.");
      })
    }
    
  }


  public GetProductsByCategory(categoryID:number){

    

    if(categoryID == 0){

      this.GetAllProductsWithInclude();
    }

    else{

      this._productService.GetByCategory(categoryID).subscribe(response=>{

        this.products = response;
      }, error =>{

        alert("Ürünler Kategoriye Göre Filtrelenirken Bir Hata Oluştu.");
      })
    }
  }

  public trackByFn(index,item){

    return item.id;

  }



}
