import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { GoogleComponent } from '../demographic/google/google.component';
import { CarCostComponent } from '../tests/car-cost/car-cost.component';
import { FoodFrequencyComponent } from '../tests/food-frequency/food-frequency.component';
import { NeoFfiComponent } from '../tests/neo-ffi/neo-ffi.component';

@Component({
  selector: 'app-linker',
  templateUrl: './linker.component.html',
  styleUrls: ['./linker.component.scss'],
})
export class LinkerComponent implements AfterViewInit{

  isLinear = false;
  changeDetectorRef: ChangeDetectorRef;

  @ViewChild(GoogleComponent, {static: false}) googleComponent: GoogleComponent;
  @ViewChild(CarCostComponent, {static: false}) carCostComponent: CarCostComponent;
  @ViewChild(FoodFrequencyComponent, {static: false}) foodFrequencyComponent: FoodFrequencyComponent;
  @ViewChild(NeoFfiComponent, {static: false}) neoFfiComponent: NeoFfiComponent;

  get frmGoogleComponent() {
     return this.googleComponent ? this.googleComponent.googleForm : null;
  }

  get frmCarCostComponent() {
     return this.carCostComponent ? this.carCostComponent.carCostForm : null;
  }

  get frmFoodFrequencyComponent() {
     return this.foodFrequencyComponent ? this.foodFrequencyComponent.foodFrequencyForm : null;
  }

  get frmNeoFfiComponent() {
      return this.neoFfiComponent ? this.neoFfiComponent.neoFfiForm : null;
   }

  // Saves the ChangeDetectorRef for afterViewInit
  constructor(private ref: ChangeDetectorRef) { this.changeDetectorRef = ref; }

  // Forcing change detection to avoid ExpressionChangedAfterItHasBeenCheckedError for further information see
  // https://indepth.dev/everything-you-need-to-know-about-the-expressionchangedafterithasbeencheckederror-error/
  ngAfterViewInit() { this.changeDetectorRef.detectChanges(); }

}

