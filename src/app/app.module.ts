import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent, LoaderComponent } from './app.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from "./material/material.module";
import { LoginComponent } from './pages/login/login.component';
import { APP_ROUTES } from "./app.routes";
import { PagesComponent } from "./pages/pages.component";
import { ServicesModule } from "./services/services.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import 'hammerjs';
import { QuillModule } from 'ngx-quill'
import {CommonModule} from "@angular/common";
import {IConfig, NgxMaskModule} from "ngx-mask";
import {HTTP_INTERCEPTORS} from "@angular/common/http";

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PagesComponent,
    LoaderComponent

  ],
  imports: [
    CommonModule,
    MaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    ServicesModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule,
    APP_ROUTES,
    NgxMaskModule.forRoot(options),
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    LoaderComponent
  ],
  providers: []
})
export class AppModule {
  public constructor() {
  }
}
