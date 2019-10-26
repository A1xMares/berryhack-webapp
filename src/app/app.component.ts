import {Component, OnDestroy} from '@angular/core';
import {Overlay, OverlayRef} from "@angular/cdk/overlay";
import {LoadingService} from "./services/loading/loading.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {ComponentPortal} from "@angular/cdk/portal";

@Component({
  selector: 'loader',
  template: '<mat-spinner></mat-spinner>',
})
export class LoaderComponent {}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements  OnDestroy {
  private onDestroy = new Subject<void>();
  private overlayRef: OverlayRef;
  private loaderPortal;
  title = 'Adroit CRM';
  constructor(
      private overlay: Overlay,
      private loadingService: LoadingService
  ) {
    this.loaderPortal = new ComponentPortal(LoaderComponent);
    this.loadingService.onLoaderChange().pipe(takeUntil(this.onDestroy)).subscribe((res) => {
      if (res) {
        const positionStrategy = this.overlay.position().global().centerHorizontally().centerVertically();
        this.overlayRef = this.overlay.create({
          hasBackdrop: true,
          backdropClass: 'loader-backdrop',
          positionStrategy
        });
        this.overlayRef.attach(this.loaderPortal);
      } else {
        if (this.overlayRef) {
          this.overlayRef.dispose();
        }
      }
    });
  }
  // --------------------- //
  // ON DESTROY LIFE CYCLE //
  // --------------------- //
  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
