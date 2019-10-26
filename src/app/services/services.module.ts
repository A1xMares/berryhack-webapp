import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {ApiService} from "./api/api.service";
import {LoadingService} from "./loading/loading.service";
import {SharingService} from "./sharing/sharing.service";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
      ApiService,
      LoadingService,
      SharingService
  ]
})
export class ServicesModule { }
