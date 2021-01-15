import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../Models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  baseUrl:string = "https://localhost:44376/api/Categories/";
  constructor(private http:HttpClient) { }


  public GetAll():Observable<Category[]>{

    return this.http.get<Category[]>(this.baseUrl);
  }


  public GetById(categoryID:number):Observable<Category>{

    return this.http.get<Category>(this.baseUrl + categoryID);
  }


  public GetByName(categoryName:string):Observable<Category[]>{

    let url = this.baseUrl + "Name/" + categoryName;
    return this.http.get<Category[]>(url);
  }


  public GetAllWithInclude():Observable<Category[]>{

    return this.http.get<Category[]>(this.baseUrl + "WithInclude");
  }


  public GetWithInclude(categoryID:number):Observable<Category>{

    let url = this.baseUrl + "WithInclude/" + categoryID;
    return this.http.get<Category>(url);
  }


  public Add(category:Category):Observable<string>{

    return this.http.post<string>(this.baseUrl, category);
  }


  public Update(category:Category):Observable<string>{

    return this.http.put<string>(this.baseUrl, category);
  }


  public Delete(categoryID:number):Observable<string>{

    return this.http.delete<string>(this.baseUrl + categoryID);
  }
}
