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
    ]
  })
  export class AppMaterialModule { }
