import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiClientService } from 'app/shared/services/client';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  data;
  constructor(private _http: HttpClient) { }
  ngOnInit() {
    this.load();
  }

  load() {
    let userId = localStorage.getItem("userId");
    let client = new ApiClientService(this._http, `posts/user/${userId}`);
    client.getAll().subscribe(resp => {
      this.data = resp.data;

    })
  }

  delete(item) {
    Swal.fire({
      title: 'Esta seguro?',
      text: "Desea eliminar este registro?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar'
    }).then((result) => {
      if (result.value) {
        let client = new ApiClientService(this._http, 'posts');
        client.delete(item.postId).subscribe(res => {
          if (res.success) {
            Swal.fire(
              'Exito',
              'Registro eliminado',
              'success'
            );
            this.load();
          }
        })
      }
    })
  }

}
