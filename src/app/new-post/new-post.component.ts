import { Component, OnInit } from '@angular/core';
import { PostModel } from 'app/shared/models/post.model';
import Swal from 'sweetalert2';
import { ApiClientService } from 'app/shared/services/client';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  model: PostModel;
  file;
  postId;
  initialLng = -69.9136638;
  initialLat = 18.4735048;
  constructor(private router: Router, private _activatedRoute: ActivatedRoute, private _http: HttpClient) {
    this._activatedRoute.params.subscribe(params => {
      this.postId = params['id'];
    });
  }
  ngOnInit() {
    this.model = new PostModel()
    if (this.postId)
      this.load();
  }

  load() {
    let client = new ApiClientService(this._http, 'posts');
    client.getById(this.postId).subscribe(res => {
      if (res.success) {
        this.model = res.data;
        this.initialLat = this.model.latitude;
        this.initialLng = this.model.longitude;

      }
    })
  }

  mapClick(item) {
    this.model.latitude = item.coords.lat;
    this.model.longitude = item.coords.lng;
  }

  changeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.file = myReader.result.toString();
    }
    myReader.readAsDataURL(file);
  }

  save() {
    // if (!this.isValid()) {
    //   Swal.fire(
    //     'Error',
    //     'Debe completar todos los campos',
    //     'error'
    //   )
    //   return;
    // }
    this.model.file = this.file.split(",")[1];
    this.model.userId = JSON.parse(localStorage.getItem("userId"));
    let client = new ApiClientService(this._http, 'posts');
    client.post(this.model).subscribe(resp => {
      if (resp.success) {
        Swal.fire(
          'Exito',
          'Registro guardado',
          'success'
        );
        this.router.navigate(["/list"]);
      }
    })

  }

  isValid(): boolean {
    return
  }
}
