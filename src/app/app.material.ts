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
    MatRadioModule
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
      MatRadioModule
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
      MatRadioModule
    ]
  })
  export class AppMaterialModule { }
