import { Component, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { GoogleComponent } from '../demographic/google/google.component';
import { NeoFfiComponent } from '../tests/neo-ffi/neo-ffi.component';
import { Tests } from '../share/enumerations/tests.enum';
import { Demographic } from '../share/enumerations/demographic.enum';
import { Store } from '@ngxs/store';
import { MpZmComponent } from '../tests/mp-zm/mp-zm.component';
import { FacebookComponent } from '../demographic/facebook/facebook.component';
import { SurveyComponent } from '../share/types/surveyComponent.type';

@Component({
   selector: 'app-linker',
   templateUrl: './linker.component.html',
   styleUrls: ['./linker.component.scss'],
})

export class LinkerComponent implements AfterViewInit {

   isLinear = false;
   changeDetectorRef: ChangeDetectorRef;

   survey: SurveyComponent[];
   demographicOptions = Demographic;
   testOptions = Tests;

   @ViewChild(GoogleComponent, {static: false}) googleComponent: GoogleComponent;
   @ViewChild(FacebookComponent, {static: false}) facebookComponent: FacebookComponent;
   @ViewChild(NeoFfiComponent, {static: false}) neoFfiComponent: NeoFfiComponent;
   @ViewChild(MpZmComponent, {static: false}) mpZmComponent: MpZmComponent;

   get frmGoogleComponent() {
      return this.googleComponent ? this.googleComponent.formGroup : null;
   }

   get frmFacebookComponent() {
      return this.facebookComponent ? this.facebookComponent.formGroup : null;
   }

   get frmNeoFfiComponent() {
      return this.neoFfiComponent ? this.neoFfiComponent.formGroup : null;
   }

   get frmZmSmComponent() {
      return this.mpZmComponent ? this.mpZmComponent.formGroup : null;
   }

  // Saves the ChangeDetectorRef for afterViewInit
  constructor(private ref: ChangeDetectorRef, private store: Store) {
    this.changeDetectorRef = ref;
    this.survey = this.store.selectSnapshot<SurveyComponent[]>(state => state.surveyState.configuration.components);
  }

  // Forcing change detection to avoid ExpressionChangedAfterItHasBeenCheckedError for further information see
  // https://indepth.dev/everything-you-need-to-know-about-the-expressionchangedafterithasbeencheckederror-error/
  ngAfterViewInit() { this.changeDetectorRef.detectChanges(); }

}
