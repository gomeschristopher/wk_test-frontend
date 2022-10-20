import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { Order } from "../models/Order";

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    constructor(private http: HttpClient) { }

    getOrders() {
        return this.http.get<Order[]>(`${environment.apiUrl}/orders`).pipe(
            catchError(errorRes => {
                return throwError(errorRes.error.message);
            }));
    }

    saveOrder(Order: Order) {
        return this.http.post(`${environment.apiUrl}/orders`, Order).pipe(
            catchError(errorRes => {
                return throwError(errorRes.error.message);
            }));
    }

    updateOrder(Order: Order, id: number) {
        return this.http.put(`${environment.apiUrl}/orders/${id}`, Order).pipe(
            catchError(errorRes => {
                return throwError(errorRes.error.message);
            }));
    }

    deleteOrder(id: number) {
        return this.http.delete(`${environment.apiUrl}/orders/${id}`).pipe(
            catchError(errorRes => {
                return throwError(errorRes.error.message);
            }));
    }
}