import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { ApiResponse } from '../models/apiResponse';

@Injectable()

export class ApiClientService {

    baseUrl: string;
    endpoint: string;

    httpOptions = {
        headers: new HttpHeaders({
            'userId': localStorage.getItem("user") || ''
        })
    }

    constructor(private _http: HttpClient, endpoint: string) {

        this.baseUrl = environment.urlBase;
        this.endpoint = endpoint;

    }

    post(data: any): Observable<any> {
        return this._http.post<any>(`${this.baseUrl}/${this.endpoint}`, data, this.httpOptions);
    }

    getAll(): Observable<ApiResponse> {
        return this, this._http.get<any>(`${this.baseUrl}/${this.endpoint}`, this.httpOptions);
    }

    getById(id: number): Observable<ApiResponse> {
        return this, this._http.get<any>(`${this.baseUrl}/${this.endpoint}/${id}`, this.httpOptions);
    }

    put(id: number, data: any): Observable<any> {
        return this._http.put<any>(`${this.baseUrl}/${this.endpoint}/${id}`, data, this.httpOptions);
    }

    delete(id: number): Observable<any> {
        return this._http.delete<any>(`${this.baseUrl}/${this.endpoint}/${id}`, this.httpOptions);
    }

}
