import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../Models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl:string = "https://localhost:44376/api/Products/";
  constructor(private _htpp :HttpClient) { }


  public GetAll():Observable<Product[]>{

    return this._htpp.get<Product[]>(this.baseUrl);
  }


  public GetById(productID:number):Observable<Product>{

    return this._htpp.get<Product>(this.baseUrl + productID);
  }


  public GetByCategory(categoryID:number):Observable<Product[]>{

    let url = this.baseUrl + "Category/" +categoryID;
    return this._htpp.get<Product[]>(url);
  }


  public GetByName(productName:string):Observable<Product[]>{

    let url = this.baseUrl + "Name/" +productName;
    return this._htpp.get<Product[]>(url);
  }


  public GetallWithInclude():Observable<Product[]>{

    return this._htpp.get<Product[]>(this.baseUrl + "WithInclude");
  }


  public GetWithInclude(productID:number):Observable<Product>{

    let url = this.baseUrl + "WithInclude/" +productID;
    return this._htpp.get<Product>(url);
  }


  public Add(product:Product):Observable<string>{

    return this._htpp.post<string>(this.baseUrl, product);
  }


  public Update(product:Product):Observable<string>{

    return this._htpp.put<string>(this.baseUrl, product);
  }


  public Delete(productID:number):Observable<string>{

    return this._htpp.delete<string>(this.baseUrl + productID);
  }


}
