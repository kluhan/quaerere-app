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
      MatStepperModule,
    ]
  })
  export class AppMaterialModule { }
