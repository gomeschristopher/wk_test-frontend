import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { Client } from "../models/Client";

@Injectable({
    providedIn: 'root'
})
export class ClientService {

    constructor(private http: HttpClient) { }

    getClients() {
        return this.http.get<Client[]>(`${environment.apiUrl}/clients`).pipe(
            catchError(errorRes => {
                return throwError(errorRes.error.message);
            }));
    }

    saveClient(client: Client) {
        return this.http.post(`${environment.apiUrl}/clients`, client).pipe(
            catchError(errorRes => {
                return throwError(errorRes.error.message);
            }));
    }

    updateClient(client: Client, id: number) {
        return this.http.put(`${environment.apiUrl}/clients/${id}`, client).pipe(
            catchError(errorRes => {
                return throwError(errorRes.error.message);
            }));
    }

    deleteClient(id: number) {
        return this.http.delete(`${environment.apiUrl}/clients/${id}`).pipe(
            catchError(errorRes => {
                return throwError(errorRes.error.message);
            }));
    }
}