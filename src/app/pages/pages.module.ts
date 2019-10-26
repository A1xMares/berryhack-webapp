import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "../material/material.module";
import { DashboardComponent } from './dashboard/dashboard.component';
import {PAGES_ROUTES} from "./pages.routes";
import {Menu} from "./menu";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AmazingTimePickerModule } from 'amazing-time-picker';

import {IConfig, NgxMaskModule} from "ngx-mask";
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { HotTableModule } from '@handsontable/angular';
import { TimeQuantityGraphComponent } from './components/time-quantity-graph/time-quantity-graph.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
    declarations: [
        DashboardComponent,
        TimeQuantityGraphComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory
        }),
        PAGES_ROUTES,
        InfiniteScrollModule,
        AmazingTimePickerModule,
        NgxMaskModule.forRoot(options),
        NgxChartsModule,
        HotTableModule,
    ],
    providers: [
        Menu
    ]
})
export class PagesModule { }
