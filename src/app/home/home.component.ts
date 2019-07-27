import { Component, OnInit } from '@angular/core';
import { ApiClientService } from 'app/shared/services/client';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
    model = {
        left: true,
        middle: false,
        right: false
    };

    focus;
    focus1;
    data: Array<{ title: string, description: string }> = [];
    apiUrl: string = `${environment.urlBase}/`;

    constructor(private _http: HttpClient, private _router: Router) { }

    ngOnInit() { this.load() }

    load() {
        let client = new ApiClientService(this._http, 'posts');
        client.getAll().subscribe(res => {
            if (res.success) {
                this.data = res.data.reverse()
            }
        })
    }

    viewDetail(item) {
        this._router.navigate[`detail/${item.postId}`]
    }

    isLogged() {
        return JSON.parse(localStorage.getItem("isLogged"));
    }
}
