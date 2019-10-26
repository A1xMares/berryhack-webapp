import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {LoadingService} from "../services/loading/loading.service";
import {ApiService} from "../services/api/api.service";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit, OnDestroy, AfterViewInit {
  // --------------------------- //
  // Local variables declaration //
  // --------------------------- //
  @ViewChild('orangeLine') orangeLine;
  @ViewChild('lineManager') lineManager;
  private onDestroy = new Subject<void>();
  public currentMenuIndex = 0;
  public branches: any[] = [];
  public currentBranch: any;
  public currentUser: any = false;
  public usersAccess = false;
  public configAccess = false;
  public logisticsAccess = false;
  public isBigSize = window.innerWidth > 1039;
  // --------------------- //
  // Component constructor //
  // --------------------- //
  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
  }
  // --------------------- //
  // FormGroup declaration //
  // --------------------- //
  public menuForm = this.fb.group({
    // branch: new FormControl({value: '', disabled: false})
  });
  // --------------------- //
  // OnInit view init cycle //
  // --------------------- //
  ngOnInit() {
  }

  // --------------------- //
  // After view init cycle //
  // --------------------- //
  ngAfterViewInit(): void {
    this.isBigSize = window.innerWidth > 1039;
    window.addEventListener('resize', () => {
      this.isBigSize = window.innerWidth > 1039;
    });
  }

  logout() {
    this.router.navigate(['/login']);
  }
  // -------------------- //
  // On destroy lifecycle //
  // -------------------- //
  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }

}
