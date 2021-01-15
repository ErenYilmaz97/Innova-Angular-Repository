import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/Models/Category';
import { Product } from 'src/app/Models/Product';
import { CategoryService } from 'src/app/Services/category.service';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'edit-product',
  templateUrl: './edit-product.component.html',

})
export class EditProductComponent implements OnInit {

  @Input() selectedProductID:number;
  @Output() closeEditModal = new EventEmitter;
  @Output() updateProducts = new EventEmitter;

  editProductForm:FormGroup;
  product:Product = new Product();
  categories:Category[];
  responseError:string;

  isFormSubmitted:boolean = false;
  validationErrors:string[] = undefined;


  isDescriptionActive:boolean = false;

  constructor(
    private _productService:ProductService,
    private _categoryService:CategoryService,
    private toast:ToastrService
  ) {  }

  ngOnInit(): void {

    this.GetAllCategories();

    if(this.selectedProductID !== 0){

      this._productService.GetWithInclude(this.selectedProductID).subscribe(response=>{

        //SERVİSTEN DÖNEN NESNEYİ SETLE, GÖNDER
        this.product = response;
        this.SetForm(this.product);
      }, error => {
        
        //DÖNEN HATAYI GÖSTER, HATA VARSA FORMU SETLEME
        this.responseError = error.error;
      })
    }

    else{

      //BOŞ NESNEYİ GÖNDER
      this.SetForm(this.product);
    }

  }



  SetForm(product:Product){

        this.editProductForm = new FormGroup({

          name : new FormControl(this.product.name, [Validators.required, Validators.minLength(3), Validators.maxLength(40)]),
          price : new FormControl(this.product.price, [Validators.required, Validators.min(1)]),
          stock : new FormControl(this.product.stock, [Validators.required, Validators.min(1)]),
          categoryId: new FormControl(this.product.categoryId, [Validators.required, Validators.min(1)]),
        });

        if(this.selectedProductID !== 0 && this.product.description != null && this.product.description != ""){

          this.AddDescriptionFormControl();
        }

  }


  GetAllCategories(){

    this._categoryService.GetAll().subscribe(response=>{

      this.categories = response;
    }, error=>{

      this.responseError = error.error;
    })
  }



  get formControls(){

    return this.editProductForm.controls;
  }

 


  EditProduct(){

    this.isFormSubmitted = true;
    this.validationErrors = undefined;
    this.responseError = undefined;

   if(this.editProductForm.valid){

      this.isFormSubmitted = false;
      this.responseError = undefined;
      const product:Product = Object.assign({},this.editProductForm.value);

      if(this.selectedProductID === 0){

        //ADD PRODUCT
        this._productService.Add(product).subscribe(response=>{

          //SUCCESS
          this.toast.success("Ürün Başarıyla Eklendi.");
          this.closeEditModal.emit();
          this.updateProducts.emit();
        }, error =>{

          if(error.error.validationErrors){

             //SERVER SIDE VALIDATION
            this.SetValidations(error.error.validationErrors);
          }

          else{

            //RESPONSE ERROR
            this.responseError = error.error;
            this.ClearForm();
          }
         
        })
      }

      else{

        //UPDATE PRODUCT
        product.id = this.selectedProductID;
        this._productService.Update(product).subscribe(response=>{

          //SUCCESS
          this.toast.success("Ürün Başarıyla Güncellendi.");
          this.closeEditModal.emit();
          this.updateProducts.emit();
        }, error=>{

          if(error.error.validationErrors){

            //SERVER SIDE VALIDATION
            this.SetValidations(error.error.validationErrors);

          }

          else{

            //RESPONSE ERROR
            this.responseError = error.error;
            this.ClearForm();
          }
          
        })

      }

   }

   else{

    //CLIENT SIDE VALIDATION
    this.responseError = "Bir Hata Oluştu.";
   }
  }


  SetValidations(validations : any[]){

    let validationArray : string[] = [];

    for(let i = 0; i < validations.length; i++){

      validationArray.push(validations[i].validationMessage);
    }

    this.validationErrors = validationArray;
    this.responseError = "Bilgileri Kontrol Ediniz.";
    //this.clearform;
  }


  ClearForm(){

    this.editProductForm.patchValue({

      name:"",
      price: "",
      stock : "",
      categoryId : 0,
      description : ""
    })
  }


  AddDescriptionFormControl(){
 
    if(this.isDescriptionActive === false){
      this.editProductForm.addControl("description", new FormControl(this.product.description,[]));
      this.isDescriptionActive = true;
    }
      
  
  }


}
