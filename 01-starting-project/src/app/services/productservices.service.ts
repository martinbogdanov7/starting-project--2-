import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { ProductResponse } from '../models/productmodels';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  apiUrl = 'https://dummyjson.com/products'
  hhhttttttppp = inject(HttpClient)

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.hhhttttttppp.get<ProductResponse>(this.apiUrl);
  }
  
  //getProductById(id: number): Observable<Product> {
    //return this.http.get<Product>(`${this.apiUrl}/${id}`);
  //}
}
