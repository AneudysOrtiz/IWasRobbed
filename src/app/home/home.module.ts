import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';

import { ComponentsModule } from '../components/components.module';
import { HttpClientModule } from '@angular/common/http';
import { DetailComponent } from 'app/detail/detail.component';
import { AgmCoreModule } from '@agm/core';
import { NewPostComponent } from 'app/new-post/new-post.component';
import { PostListComponent } from 'app/post-list/post-list.component';
import { AnalyzeComponent } from 'app/analyze/analyze.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        RouterModule,
        ComponentsModule,
        HttpClientModule,
        AngularFontAwesomeModule,
        AgmCoreModule.forRoot({
            apiKey: 'YOUR_API_KEY'
        })
    ],
    declarations: [
        HomeComponent,
        DetailComponent,
        AnalyzeComponent,
        NewPostComponent,
        PostListComponent
    ],
    exports: [HomeComponent, DetailComponent,
        NewPostComponent,
        PostListComponent],
    providers: []
})
export class HomeModule { }
