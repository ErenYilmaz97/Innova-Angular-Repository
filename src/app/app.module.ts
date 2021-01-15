import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductPageComponent } from './PageComponents/product-page/product-page.component';
import { CategoryPageComponent } from './PageComponents/category-page/category-page.component';

import {HttpClientModule} from '@angular/common/http'
import { EditProductComponent } from './Components/edit-product/edit-product.component';
import { ProductDetailComponent } from './Components/product-detail/product-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryDetailComponent } from './Components/category-detail/category-detail.component';
import { EditCategoryComponent } from './Components/edit-category/edit-category.component';
import { NavbarComponent } from './Components/navbar/navbar.component';

import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


const appRoutes:Routes = [

{path:"", component:ProductPageComponent},
{path:"Products", component:ProductPageComponent, children:[
  {path:"Detail/:id", component:ProductDetailComponent}  
]},
{path:"Categories", component:CategoryPageComponent, children:[

  {path:"Detail/:id", component:CategoryDetailComponent}
]}
]

@NgModule({
  declarations: [
    AppComponent,
    ProductPageComponent,
    CategoryPageComponent,
    EditProductComponent,
    ProductDetailComponent,
    CategoryDetailComponent,
    EditCategoryComponent,
    NavbarComponent
   
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({

      timeOut:600,
      progressBar : true,
      progressAnimation: "increasing",
      preventDuplicates:true

    })
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
