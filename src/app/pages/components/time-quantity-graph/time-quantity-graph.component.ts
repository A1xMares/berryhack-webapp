import {
  AfterViewInit,
  Component,
  ElementRef, HostListener,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {ApiService} from '../../../services/api/api.service';
import {takeUntil} from "rxjs/operators";
import * as shape from 'd3-shape';

@Component({
  selector: 'app-time-quantity-graph',
  templateUrl: './time-quantity-graph.component.html',
  styleUrls: ['./time-quantity-graph.component.scss']
})
export class TimeQuantityGraphComponent implements OnInit, AfterViewInit, OnDestroy {

  // ================================ COMPONENT CONFIG AND VARIABLES ================================ //

  // --------------------------- //
  // Local variables declaration //
  // --------------------------- //

  /* manage component */
  @ViewChildren('displayData') displayElem: QueryList<any>;
  @ViewChildren('noData') noDisplayElem: QueryList<any>;
  public displayData = new BehaviorSubject<boolean>(false);
  private onDestroy = new Subject<void>();
  public configObject: any;
  public loading = false;
  public curveFunction: any = shape.curveMonotoneX;
  public firstLoad = true;
  public isBigSize = window.innerWidth > 768;

  /* config component input */
  @Input()
  set config(config) {
    this.configObject = config;
  }

  /* manage time */
  currentTimeType = 'Year';
  currentDateText = '';
  currentDate = new Date();
  firstDayOfWeek: Date = new Date();
  lastDayOfWeek: Date = new Date();
  private months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  private monthAbr = ['Jan ','Feb ','Mar ','Apr ','May ','Jun ','Jul ','Aug ','Sep ','Oct ','Nov ','Dec '];

  /* manage chart */
  public chartData: any[] = [{name: 'Light', series:[]}, {name: 'Temperature', series:[]}, {name: 'Humidity', series:[]}, {name: 'Pressure', series:[]}];
  public rawData: any[] = [];
  public colorScheme = {
    domain: ['#F4C35F', '#4C4769', '#004E6F', '#FF7500']
  };

  // --------------------- //
  // Component constructor //
  // --------------------- //
  constructor(
      private apiService: ApiService
  ) { }

  // ================================ ON INIT CYCLE METHODS AND LISTENERS ================================ //

  // ------------------ //
  // On view init cycle //
  // ------------------ //
  ngOnInit() {
    this.currentDateText = this.currentDate.getFullYear().toString();
    this.loadData();
  }

  // ----------------- //
  // Listener OnResize //
  // ----------------- //
  @HostListener('window:resize') onResize() {
    let tempOnLarge;
    if (this.firstLoad ) {
      tempOnLarge = !this.isBigSize;
    } else {
      tempOnLarge = window.innerWidth > 768;
    }
    if (tempOnLarge !== this.isBigSize) {
      this.isBigSize = window.innerWidth > 768;
    }
  }

  // --------------------- //
  // After view init cycle //
  // --------------------- //
  ngAfterViewInit() {
  }

  // ================================ MANAGE DATA METHODS ================================ //

  // --------------- //
  // LOAD GRAPH DATA //
  // --------------- //
  loadData() {
    let customFilter = '&results=1';
    if (this.firstLoad) {
      customFilter = '&results=50'
    }
    /* preform request */
    this.apiService.getDataObjects(customFilter).pipe(takeUntil(this.onDestroy)).subscribe((data: any) => {
      if (this.firstLoad) {
        this.rawData = data.feeds;
        this.processData(data.feeds);
      } else {
        if (data.feeds[0]) {
          if (data.feeds[0] !== this.rawData[this.rawData.length -1]) {
            this.processData(data.feeds);
          }
        }
      }
      this.firstLoad = false;
      setTimeout( () => {
        this.loadData();
      }, 3000);
    });
  }

  processData(data) {
    const tempData = this.chartData;
    data.forEach((values, index) => {
      tempData[0].series.push({name: values.created_at, value: parseInt(values.field1)});
      tempData[1].series.push({name: values.created_at, value: parseInt(values.field2)});
      tempData[2].series.push({name: values.created_at, value: parseInt(values.field3)});
      tempData[3].series.push({name: values.created_at, value: parseInt(values.field4)});
    });
    this.chartData = tempData;
    console.log(this.chartData)
  }

  // ================================ DESTROY COMPONENT HOOK MANAGEMENT ================================ //

  // -------------------- //
  // On destroy lifecycle //
  // -------------------- //
  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }

}
