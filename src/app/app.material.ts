import { NgModule } from '@angular/core';
import {
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSliderModule,
    MatStepperModule,
    MatButtonToggleModule,
  } from '@angular/material';

  @NgModule({
    imports: [
      MatInputModule,
      MatButtonModule,
      MatSelectModule,
      MatToolbarModule,
      MatIconModule,
      MatMenuModule,
      MatCardModule,
      MatSlideToggleModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatRadioModule,
      MatSliderModule,
      MatButtonToggleModule,
      MatStepperModule,
    ],
    exports: [
      MatInputModule,
      MatButtonModule,
      MatSelectModule,
      MatToolbarModule,
      MatIconModule,
      MatMenuModule,
      MatCardModule,
      MatSlideToggleModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatRadioModule,
      MatSliderModule,
      MatButtonToggleModule,
      MatStepperModule,
    ]
  })
  export class AppMaterialModule { }
