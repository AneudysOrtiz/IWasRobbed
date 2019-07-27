import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiClientService } from 'app/shared/services/client';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  postId: number;
  model = {};
  constructor(private _activatedRoute: ActivatedRoute, private _http: HttpClient) {
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

}
