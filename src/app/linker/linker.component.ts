import { Component, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { GoogleComponent } from '../demographic/google/google.component';
import { NeoFfiComponent } from '../tests/neo-ffi/neo-ffi.component';
import { Tests } from '../share/enumerations/tests.enum';
import { Demographic } from '../share/enumerations/demographic.enum';
import { Store } from '@ngxs/store';
import { MpZmComponent } from '../tests/mp-zm/mp-zm.component';
import { FacebookComponent } from '../demographic/facebook/facebook.component';
import { SurveyComponent } from '../share/types/surveyComponent.type';
import { SynchronisationService } from '../synchronisation.service';
import { Router } from '@angular/router';

@Component({
   selector: 'app-linker',
   templateUrl: './linker.component.html',
   styleUrls: ['./linker.component.scss'],
})

export class LinkerComponent implements AfterViewInit {

   isLinear = false;
   changeDetectorRef: ChangeDetectorRef;

   test: SurveyComponent[];
   demographic: SurveyComponent;
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
  // tslint:disable-next-line: max-line-length
  constructor(private ref: ChangeDetectorRef, private store: Store, private synchronisationService: SynchronisationService, private router: Router) {
    this.changeDetectorRef = ref;
    this.test = this.store.selectSnapshot<SurveyComponent[]>(state => state.surveyState.configuration.components);
    this.demographic = this.store.selectSnapshot<SurveyComponent>(state => state.surveyState.configuration.demographic);
  }

  // Forcing change detection to avoid ExpressionChangedAfterItHasBeenCheckedError for further information see
  // https://indepth.dev/everything-you-need-to-know-about-the-expressionchangedafterithasbeencheckederror-error/
  ngAfterViewInit() { this.changeDetectorRef.detectChanges(); }

  async requestResults(): Promise<void> {
     await this.synchronisationService.requestResult();
     this.router.navigate(['result']);
  }

}
