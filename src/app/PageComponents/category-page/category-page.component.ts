import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/Models/Category';
import { CategoryService } from 'src/app/Services/category.service';

@Component({
  selector: 'category-page',
  templateUrl: './category-page.component.html',

})
export class CategoryPageComponent implements OnInit {

  selectedCategoryID:number = 0;
  categories:Category[];

  //DELETE
  responseError:string = undefined;
  selectedCategory:Category;

  constructor(
    private _modalService:NgbModal,
    private _categoryService:CategoryService,
    private toast:ToastrService
    
  ) { }

  ngOnInit(): void {

    this.GetAllCategories();

  }



  GetAllCategories(){

    this._categoryService.GetAllWithInclude().subscribe(response=>{

      this.categories = response;
    }, error=>{

      alert("Kategoriler Listelenirken Bir Hata Oluştu.");
    })
  }


  CloseEditModal(){

    this._modalService.dismissAll();

  }


  OpenEditModal(categoryID:number, editCategoryModal){

    this.selectedCategoryID = categoryID;
    const modalRef = this._modalService.open(editCategoryModal);

  }


  OpenDeleteModal(categoryID:number, deleteCategoryModal){
    this.selectedCategoryID = categoryID;
    this.responseError = undefined;

    this._categoryService.GetWithInclude(this.selectedCategoryID).subscribe(response=>{

      this.selectedCategory = response;
      const modalRef = this._modalService.open(deleteCategoryModal);
    }, error=>{

      this.responseError = error.error;
      const modalRef = this._modalService.open(deleteCategoryModal);

    })

  }


  DeleteCategory(){

    this._categoryService.Delete(this.selectedCategory.id).subscribe(response=>{

      this.toast.success("Kategori Başarıyla Silindi!.");
      this.GetAllCategories();
      this._modalService.dismissAll();
    },error=>{

      this.responseError = error.error;
    })
  }


  SetSelectedCategoryID(categoryID:number){

    this.selectedCategoryID = categoryID;
    
  }


  GetProductsByName(searchText:string){

    if(searchText == null || searchText == ""){

      this.GetAllCategories();

    }

    else{
      this._categoryService.GetByName(searchText).subscribe(response=>{

        this.categories = response;
      }, error =>{
  
        alert("Kategoriler Filtrelenirken Hata Oluştu.");
      })

    }

    
  }


  public trackByFn(index,item){

    return item.id;

  }

}
