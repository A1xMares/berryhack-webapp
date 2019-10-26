import {
    AfterViewInit,
    Component,
    ElementRef,
    HostListener,
    OnDestroy,
    OnInit,
    QueryList,
    ViewChild,
    ViewChildren
} from '@angular/core';

import {BehaviorSubject, Subject} from "rxjs";
import {MatBottomSheet, MatDialog, MatSnackBar} from "@angular/material";
import {FormBuilder, FormControl} from "@angular/forms";
import {ApiService} from "../../services/api/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SharingService} from "../../services/sharing/sharing.service";
import {takeUntil} from "rxjs/operators";
import {Title} from "@angular/platform-browser";
import {ChartDataSets, ChartType, RadialChartOptions} from "chart.js";
import {BaseChartDirective, Label} from "ng2-charts";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit {

    // ================================ COMPONENT CONFING AND VARIABLES ================================ //

    public isBigSize = window.innerWidth > 768;

    public lastUpdate = '-';

    public currentTunel = 1;

    @ViewChild('chartContainer') chartContainer: HTMLElement;
    @ViewChild('radarChart') radarChart: BaseChartDirective;

    public chartWidth = 350;

    public data = [
        {
            "name": "Germany",
            "series": [
                {
                    "name": "2010",
                    "value": 7300000
                },
                {
                    "name": "2011",
                    "value": 8940000
                }
            ]
        },

        {
            "name": "USA",
            "series": [
                {
                    "name": "2010",
                    "value": 7870000
                },
                {
                    "name": "2011",
                    "value": 8270000
                }
            ]
        },

        {
            "name": "France",
            "series": [
                {
                    "name": "2010",
                    "value": 5000002
                },
                {
                    "name": "2011",
                    "value": 5800000
                }
            ]
        }
    ];

    public customFilterProperties: any[] = [];
    public customFilterValues: any[] = [];

    public radarChartOptions: RadialChartOptions = {
        responsive: true,
    };
    public radarChartLabels: Label[] = ['Luminosidad', 'Temperatura', 'Húmedad', 'Presión'];

    public radarChartData: ChartDataSets[] = [
        { data: [0, 0, 0, 0], label: 'Valores actuales' },
        { data: [31.5, 25, 40, 85], label: 'Valores idóneos' }
    ];
    public radarChartType: ChartType = 'radar';

    public idealValues: any = {
        luminocity: 315000,
        temperature: 25000,
        humidity: 40,
        pressure: 85000
    };

    public currentValues: any = {
        luminocity: 0,
        temperature: 0,
        humidity: 0,
        pressure: 0
    };

    // ----------------- //
    // Listener OnResize //
    // ----------------- //
    @HostListener('window:resize') onResize() {
        this.isBigSize = window.innerWidth > 768;
        console.log(this.chartContainer.offsetWidth);
    }

    // --------------------------- //
    // Local variables declaration //
    // --------------------------- //

    /* manage component */
    private onDestroy = new Subject<void>();

    // --------------------------- //
    // Component constructor //
    // --------------------------- //
    constructor(
        private apiService: ApiService,
        private bottomSheet: MatBottomSheet,
        private sharingService: SharingService,
        private titleService: Title
    ) {
        this.setTitle('Bio Berry | Dashboard');
    }

    // ================================ INIT COMPONENT HOOKS AND LISTENERS ================================ //

    // ---------------- //
    // Set title method //
    // ---------------- //
    public setTitle(newTitle: string) {
        this.titleService.setTitle( newTitle );
    }

    ngOnInit(): void {
        this.setTimer();
        const prevValues = localStorage.getItem('idealValues');
        if (prevValues) {
            this.idealValues = JSON.parse(prevValues);
        }
    }

    ngAfterViewInit() {
        this.setTimeValues();
    }

    setTimer() {
        this.lastUpdate = this.getFormattedDate(new Date);
        setTimeout(() => {
            this.setTimer();
        },15000);
    }

    setTimeValues() {
        /* preform request */
        this.apiService.getDataObjects('&results=1').pipe(takeUntil(this.onDestroy)).subscribe((data: any) => {
            if (data.feeds) {
                const tempCurrentValues = {
                    luminocity: data.feeds[0].field1 ? data.feeds[0].field1 : 0,
                    temperature: data.feeds[0].field2 ? data.feeds[0].field2 : 0,
                    humidity: data.feeds[0].field3 ? data.feeds[0].field3 : 0,
                    pressure: data.feeds[0].field4 ? data.feeds[0].field4 : 0
                };
                if (JSON.stringify(tempCurrentValues) !== JSON.stringify(this.currentValues)) {
                    this.currentValues = tempCurrentValues;
                    this.updateVariances();
                }
            }
            setTimeout( () => {
                this.setTimeValues();
            }, 3000);
        });
    }

    updateVariances() {
        this.radarChartData = [
            { data: [this.currentValues.luminocity / 1000, this.currentValues.temperature / 1000, this.currentValues.humidity, this.currentValues.pressure / 1000], label: 'Valores actuales' },
            { data: [this.idealValues.luminocity / 1000, this.idealValues.temperature / 1000, this.idealValues.humidity, this.idealValues.pressure / 1000], label: 'Valores idóneos' }
        ];
    }

    getFormattedDate(date) {
        const tempDate = new Date(date);
        const month = (tempDate.getMonth() + 1);
        const day = tempDate.getDate();
        const year = tempDate.getFullYear();
        const hours = tempDate.getHours();
        const minutes = tempDate.getMinutes();
        return day + '-' + month + '-' + year + ' ' + (hours < 10 ? ('0' + hours) : hours) + ':' + (minutes < 10 ? ('0' + minutes) : minutes);
    }

    // ============================================= ON DESTROY LIFECYCLE ============================================= //

    // -------------------- //
    // On destroy lifecycle //
    // -------------------- //
    ngOnDestroy(): void {
        this.onDestroy.next();
        this.onDestroy.unsubscribe();
    }

}
