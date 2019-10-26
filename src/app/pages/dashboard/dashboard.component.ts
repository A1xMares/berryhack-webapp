import {
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

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

    // ================================ COMPONENT CONFING AND VARIABLES ================================ //

    public isBigSize = window.innerWidth > 768;

    public lastUpdate = '-';

    public currentTunel = 1;

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

    // ----------------- //
    // Listener OnResize //
    // ----------------- //
    @HostListener('window:resize') onResize() {
        this.isBigSize = window.innerWidth > 768;
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
    }

    setTimer() {
        this.lastUpdate = this.getFormattedDate(new Date);
        setTimeout(() => {
            this.setTimer();
        },3000);
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
