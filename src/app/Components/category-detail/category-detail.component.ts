import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/Models/Category';
import { CategoryService } from 'src/app/Services/category.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
 
})
export class CategoryDetailComponent implements OnInit {

  selectedCategory:Category = undefined;
  responseError:string = undefined;

  constructor(
    private route:ActivatedRoute,
    private _categoryService:CategoryService

  ) { }


  ngOnInit(): void {

    this.route.paramMap.subscribe(params=>{

      this.selectedCategory = undefined;
      this.responseError = undefined;

      this.route.paramMap.subscribe(params=>{

        let categoryID:number =+ params.get("id");
        this.GetCategoryById(categoryID);
      })
      
    })
  }


  GetCategoryById(categoryID:number){

    this._categoryService.GetWithInclude(categoryID).subscribe(response=>{

      this.selectedCategory = response;
    }, error =>{

      this.responseError = error.error;
      this.selectedCategory = new Category();
    })
  }

}
