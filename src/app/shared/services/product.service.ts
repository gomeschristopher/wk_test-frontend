import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { Product } from "../models/Product";

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(private http: HttpClient) { }

    getProducts() {
        return this.http.get<Product[]>(`${environment.apiUrl}/products`).pipe(
            catchError(errorRes => {
                return throwError(errorRes.error.message);
            }));
    }

    saveProduct(Product: Product) {
        return this.http.post(`${environment.apiUrl}/products`, Product).pipe(
            catchError(errorRes => {
                return throwError(errorRes.error.message);
            }));
    }

    updateProduct(Product: Product, id: number) {
        return this.http.put(`${environment.apiUrl}/products/${id}`, Product).pipe(
            catchError(errorRes => {
                return throwError(errorRes.error.message);
            }));
    }

    deleteProduct(id: number) {
        return this.http.delete(`${environment.apiUrl}/products/${id}`).pipe(
            catchError(errorRes => {
                return throwError(errorRes.error.message);
            }));
    }
}