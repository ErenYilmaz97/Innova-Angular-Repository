import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/Models/Category';
import { CategoryService } from 'src/app/Services/category.service';


@Component({
  selector: 'edit-category',
  templateUrl: './edit-category.component.html',
  
})
export class EditCategoryComponent implements OnInit {

  @Input() selectedCategoryID:number = 0;
  @Output() updateCategories = new EventEmitter;
  @Output() closeModal = new EventEmitter;
  

  category:Category = new Category();
  responseError:string = undefined;
  validationErrors: string[] = undefined;
  isFormSubmitted:boolean = false;

  editCategoryForm:FormGroup;

  isDescriptionActive:boolean = false;

  constructor(
    private _categoryService:CategoryService,
    private toast:ToastrService
  ) { }

  ngOnInit(): void {

    if(this.selectedCategoryID !== 0){

      //CATEGORY'I ÇEK
      this._categoryService.GetById(this.selectedCategoryID).subscribe(response=>{

        //FORMU SETLE
        this.category = response;
        this.setForm(this.category);
      }, error=>{

        //FORMU SETLEME; GELEN HATAYI SETLE
        this.responseError = error.error;
      })
    }

    else{
      //FORMU SETLE
      this.setForm(new Category());
    }
  }


 

  get name(){

    return this.editCategoryForm.get("name");
  }


  get description(){

    return this.editCategoryForm.get("description");
  }

  setForm(category:Category){

    this.editCategoryForm = new FormGroup({

      name: new FormControl(category.name,[Validators.required, Validators.minLength(3), Validators.maxLength(30)])
    });

    if(this.selectedCategoryID !== 0 && this.category.description != null && this.category.description !=""){

      this.AddDescriptionFormControl();
    }
  }


  EditCategory(){

    this.isFormSubmitted = true;
    this.responseError = undefined;
    this.validationErrors = undefined;
    
    if(this.editCategoryForm.valid){

      this.isFormSubmitted = false;
      const category:Category = Object.assign({},this.editCategoryForm.value);

      if(this.selectedCategoryID === 0){
        
        //ADD
        this._categoryService.Add(category).subscribe(response=>{

          this.toast.success("Kategori Başarıyla Eklendi!");
          this.updateCategories.emit();
          this.closeModal.emit();
        }, error=>{

          if(error.error.validationErrors){

            //SERVER SIDE VALIDATION
            this.SetValidations(error.error.validationErrors);

          }

          else{

            //SERVER SIDE ERROR
            this.responseError = error.error;
            this.ClearForm();
          }
        })
      }

      else{

        //UPDATE
        category.id = this.category.id;
        this._categoryService.Update(category).subscribe(response=>{

          this.toast.success("Kategori Başarıyla Güncellendi!");
          this.updateCategories.emit();
          this.closeModal.emit();

        }, error=>{

          if(error.error.validationErrors){
            //SERVER SIDE VALIDATION
            this.SetValidations(error.error.validationErrors);
            
          }

          else{

            this.responseError = error.error;
            this.ClearForm();
          }
        })
      }

    }

    else{
      //CLIENT SIDE VALIDATION
      this.responseError = "Bilgilerinizi Kontrol Ediniz.";
    }
  }



  SetValidations(validations : any[]){

    let validationArray : string[] = [];

    for(let i = 0; i < validations.length; i++){

      validationArray.push(validations[i].validationMessage);
    }

    this.validationErrors = validationArray;
    this.responseError = "Bilgiler Doğrulanamadı.";
    //this.clearform;
  }

  ClearForm(){

    this.editCategoryForm.patchValue({

      name:"",
      description:""
    });
  }


  AddDescriptionFormControl(){

    if(this.isDescriptionActive === false){

      this.editCategoryForm.addControl("description", new FormControl(this.category.description, []));
      this.isDescriptionActive = true;
    }
  }
}
