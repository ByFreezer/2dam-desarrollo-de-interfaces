import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductsResponse } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = 'https://dummyjson.com/products';

  // Pedimos una tanda concreta de productos (12 a partir del nº 90)
  // para mostrar artículos distintos a los del listado por defecto.
  getProducts(limit = 12, skip = 90): Observable<ProductsResponse> {
    const params = new HttpParams()
      .set('limit', limit)
      .set('skip', skip);

    return this.http.get<ProductsResponse>(this.apiUrl, { params });
  }
}
