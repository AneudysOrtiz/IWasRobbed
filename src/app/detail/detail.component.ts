import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiClientService } from 'app/shared/services/client';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  @ViewChild('image') image: ElementRef;
  postId: number;
  model = {};
  imageUrl;
  apiUrl: string = `${environment.urlBase}/`;
  constructor(private _router: Router, private _activatedRoute: ActivatedRoute, private _http: HttpClient) {
    this._activatedRoute.params.subscribe(params => {
      this.postId = params['id'];
    });
  }

  ngOnInit() {
    this.load();

  }

  load() {
    let client = new ApiClientService(this._http, 'posts');
    client.getById(this.postId).subscribe(res => {
      if (res.success) {
        this.model = res.data
      }
    })
  }

  errorHandler(event) {
    event.target.src = "https://picsum.photos/640/520";
  }

  viewDetail(item) {
    let img = (<HTMLImageElement>this.image.nativeElement)
    this._router.navigate([`analyze/${img.clientWidth}x${img.clientHeight}/${item}`])
  }

}
