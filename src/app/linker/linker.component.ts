import { Component, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { GoogleComponent } from '../demographic/google/google.component';
import { CarCostComponent } from '../tests/car-cost/car-cost.component';
import { FoodFrequencyComponent } from '../tests/food-frequency/food-frequency.component';
import { NeoFfiComponent } from '../tests/neo-ffi/neo-ffi.component';
import { Tests } from '../share/enumerations/tests.enum';
import { Demographic } from '../share/enumerations/demographic.enum';
import { Store } from '@ngxs/store';
import { ZmSmComponent } from '../tests/zm-sm/zm-sm.component';

// TODO Update
type SurveyComponent = Demographic | Tests;

@Component({
  selector: 'app-linker',
  templateUrl: './linker.component.html',
  styleUrls: ['./linker.component.scss'],
})

export class LinkerComponent implements AfterViewInit{

  isLinear = true;
  changeDetectorRef: ChangeDetectorRef;

  survey: SurveyComponent[];
  demographicOptions = Demographic;
  testOptions = Tests;

  @ViewChild(GoogleComponent, {static: false}) googleComponent: GoogleComponent;
  @ViewChild(CarCostComponent, {static: false}) carCostComponent: CarCostComponent;
  @ViewChild(FoodFrequencyComponent, {static: false}) foodFrequencyComponent: FoodFrequencyComponent;
  @ViewChild(NeoFfiComponent, {static: false}) neoFfiComponent: NeoFfiComponent;
  @ViewChild(ZmSmComponent, {static: false}) zmSmComponent: ZmSmComponent;

  // TODO Update
  get frmGoogleComponent() {
     return this.googleComponent ? this.googleComponent.googleForm : null;
  }
  // TODO Update
  get frmCarCostComponent() {
     return this.carCostComponent ? this.carCostComponent.carCostForm : null;
  }
  // TODO Update
  get frmFoodFrequencyComponent() {
     return this.foodFrequencyComponent ? this.foodFrequencyComponent.foodFrequencyForm : null;
  }
  // TODO Update
  get frmNeoFfiComponent() {
      return this.neoFfiComponent ? this.neoFfiComponent.neoFfiForm : null;
   }
   // TODO Update
   get frmZmSmComponent() {
       return this.zmSmComponent ? this.zmSmComponent.zmSmForm : null;
    }


  // Saves the ChangeDetectorRef for afterViewInit
  constructor(private ref: ChangeDetectorRef, private store: Store) {
    this.changeDetectorRef = ref;
    this.survey = this.store.selectSnapshot<SurveyComponent[]>(state => state.surveyState.surveyLayout);
  }

  // Forcing change detection to avoid ExpressionChangedAfterItHasBeenCheckedError for further information see
  // https://indepth.dev/everything-you-need-to-know-about-the-expressionchangedafterithasbeencheckederror-error/
  ngAfterViewInit() { this.changeDetectorRef.detectChanges(); }

}



