import { Component, OnInit } from '@angular/core';
import { ApiClientService } from 'app/shared/services/client';
import { HttpClient } from '@angular/common/http';
import { User } from 'app/shared/models/user';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    test: Date = new Date();
    focus;
    focus1;
    message: string;
    model: User = new User();
    newUser = false;
    constructor(private _httpClient: HttpClient, private router: Router) { }

    ngOnInit() { }

    register() {
        if (!this.model.isValid()) {
            Swal.fire(
                'Error',
                'Debe completar todos los campos',
                'error'
            )
            return;
        }

        let client = new ApiClientService(this._httpClient, 'users');
        client.post(this.model).subscribe(res => {
            if (res.success) {
                Swal.fire(
                    'Exito',
                    'Usuario registrado',
                    'success'
                )
            } else
                Swal.fire(
                    'Error',
                    res.message,
                    'error'
                )
        });
    }

    login() {
        let client = new ApiClientService(this._httpClient, 'users/login');
        client.post(this.model).subscribe(res => {
            if (res.success) {
                localStorage.setItem("isLogged", 'true');
                localStorage.setItem("userId", res.data.userId);
                this.router.navigate(['list']);
            } else {
                Swal.fire(
                    'Error',
                    res.message,
                    'error'
                )
            }
        });
    }
}
