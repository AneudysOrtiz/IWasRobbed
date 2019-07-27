import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { environment } from 'environments/environment';
import { ActivatedRoute } from '@angular/router';
import { ApiClientService } from 'app/shared/services/client';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-analyze',
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.scss']
})
export class AnalyzeComponent {

  @ViewChild('myCanvas') myCanvas: ElementRef;
  imageId: number;
  model = {};
  imageUrl;
  imageBase64;
  width;
  height;
  apiUrl: string = `${environment.urlBase}/`;
  tipoAnalisis = 0;
  data;
  isFaceMode = false;
  faceData;
  constructor(private _activatedRoute: ActivatedRoute, private _http: HttpClient) {

  }
  ngAfterViewInit() {
    this._activatedRoute.params.subscribe(params => {
      this.imageId = params['id'];
      if (this.imageId) {
        this.height = params['size'].split("x")[1]
        this.width = params['size'].split("x")[0]
        this.loadImage()
      }
    });
  }

  loadImage() {
    let canvas = (<HTMLCanvasElement>this.myCanvas.nativeElement)
    let ctx = canvas.getContext('2d');
    var background = new Image();
    background.crossOrigin = 'anonymous';
    background.src = this.apiUrl + this.imageId;

    background.onload = () => {
      canvas.height = this.height;
      canvas.width = this.width;
      ctx.drawImage(background, 0, 0, this.width, this.height);
      this.imageBase64 = canvas.toDataURL().split(/,/)[1];
    }
  }



  load() {
    let client = new ApiClientService(this._http, 'posts');
    client.getById(this.imageId).subscribe(res => {
      if (res.success) {
        this.model = res.data
      }
    })
  }


  errorHandler(event) {
    event.target.src = "https://picsum.photos/640/520";
  }

  process() {
    let client = new ApiClientService(this._http, `posts/analyzeImg`);
    let body = { image: this.imageBase64, operation: this.tipoAnalisis };
    this.showLoading();
    client.post(body).subscribe(res => {
      Swal.close()
      this.transform(res.responses[0])
    })
  }

  equivalent(literal) {
    switch (literal) {
      case "VERY_UNLIKELY":
        return 20;
      case "UNLIKELY":
        return 40;
      default:
        return 60;
      case "LIKELY":
        return 80;
      case "VERY_LIKELY":
        return 100;
    }
  }

  equivalentLabel(literal) {
    switch (literal) {
      case "VERY_UNLIKELY":
        return "Muy improbable";
      case "UNLIKELY":
        return "Improbable";
      default:
        return "Medio";
      case "LIKELY":
        return "Probable";
      case "VERY_LIKELY":
        return "Muy probable";
    }
  }

  transform(data) {
    if (this.isEmpty(data)) {
      Swal.fire(
        'Atención',
        'No se encontro resultados',
        'warning'
      )
      return;
    }

    this.isFaceMode = false;
    switch (Number(this.tipoAnalisis)) {
      case 1:
        this.faceData = data.faceAnnotations[0];
        this.isFaceMode = true;
        break;
      case 2:
        this.simpleDataLoad("labelAnnotations", data);
        break;
      case 3:
        this.simpleDataLoad("logoAnnotations", data);
        break;
      case 4:
        // let canvas = (<HTMLCanvasElement>this.myCanvas.nativeElement)
        // let ctx = canvas.getContext('2d');
        this.data = [];
        // ctx.fillStyle = '#f00';

        data.localizedObjectAnnotations.forEach(item => {
          let obj: { label: string, value: any } = { label: item.name, value: Math.trunc(item.score * 100) };
          this.data.push(obj);
          // ctx.beginPath();
          // item.boundingPoly.normalizedVertices.forEach(element => {
          //   ctx.lineTo(element.x * 100, element.y * 100);
          // });
          // ctx.closePath();
          // ctx.stroke();
        });


        this.data = data.localizedObjectAnnotations.map(item => {
          let obj: { label: string, value: any } = { label: item.name, value: Math.trunc(item.score * 100) };
          return obj;
        })
        break;
    }
  }

  equivalentColor(literal) {
    switch (literal) {
      case "VERY_UNLIKELY":
        return "bg-danger";
      case "UNLIKELY":
        return "bg-warning";
      default:
        return "bg-primary";
      case "LIKELY":
        return "bg-primary";
      case "VERY_LIKELY":
        return "bg-success";
    }
  }

  simpleDataLoad(field, data) {
    this.data = data[field].map(item => {
      let obj: { label: string, value: any } = { label: item.description, value: Math.trunc(item.score * 100) };
      return obj;
    })
  }

  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  showLoading() {
    Swal.fire({
      title: '<strong>Cargando...</strong>',
      html:
        "<img src='src/assets/img/loading.gif'>",
      showCancelButton: false,
      showConfirmButton: false,
      allowOutsideClick: false
    })
  }

}
