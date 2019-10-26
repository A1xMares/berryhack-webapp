import {AfterViewInit, Component, Inject, OnDestroy, OnInit, NgZone, ViewChild} from '@angular/core';
import {Subject} from "rxjs";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../services/api/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from '@angular/material/snack-bar';
import {LoadingService} from "../../services/loading/loading.service";
import {takeUntil} from "rxjs/operators";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  // --------------------------- //
  // Local variables declaration //
  // --------------------------- //
  private onDestroy = new Subject<void>();
  private firstLoad = true;
  // --------------------- //
  // Component constructor //
  // --------------------- //
  constructor(
      private apiService: ApiService,
      private fb: FormBuilder,
      private router: Router,
      private zone: NgZone,
      private activateRoute: ActivatedRoute,
      private snackBar: MatSnackBar,
      private loadingService: LoadingService,
      private dialog: MatDialog,
      private titleService: Title
  ) {
    this.setTitle('Bio Berry | Login');
  }
  public setTitle(newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  ngOnInit(): void {
  }
  // ---------------------- //
  // Perform login function //
  // ---------------------- //
  performLogin() {
    this.router.navigate(['/dashboard']).then(() => {
      this.loadingService.showLoader.next(false);
    });
  }
  // --------------------------- //
  // Show toast on invalid login //
  // --------------------------- //
  presentToast(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      panelClass: ['green-snackbar'],
      horizontalPosition: 'end',
      verticalPosition: document.documentElement.clientWidth >= 1050 ? 'top' : 'bottom'
    });
  }

  presentError() {
    this.snackBar.open('Credenciales incorrectas', 'Cerrar', {
      duration: 3000,
      panelClass: ['red-snackbar'],
      horizontalPosition: 'end',
      verticalPosition: document.documentElement.clientWidth >= 1050 ? 'top' : 'bottom'
    });
  }
  // -------------------- //
  // On destroy lifecycle //
  // -------------------- //
  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
