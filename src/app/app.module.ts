import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app.material';
import { NavigationComponent } from './share/components/navigation/navigation.component';
import { GoogleComponent } from './demographic/google/google.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FacebookComponent } from './demographic/facebook/facebook.component';
import { FoodFrequencyComponent } from './tests/food-frequency/food-frequency.component';
import { CarCostComponent } from './tests/car-cost/car-cost.component';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { SurveyState } from './state/survey.state';
import { environment } from 'src/environments/environment';
import { AgeComponent } from './share/components/age/age.component';
import { GenderComponent } from './share/components/gender/gender.component';
import { CountryComponent } from './share/components/country/country.component';
import { EducationComponent } from './share/components/education/education.component';
import { IncomeComponent } from './share/components/income/income.component';
import { NameComponent } from './share/components/name/name.component';
import { LinkerComponent } from './linker/linker.component';
import { NeoFfiComponent } from './tests/neo-ffi/neo-ffi.component';
import { LikertItemComponent } from './share/components/likert-item/likert-item.component';
import { MpZmComponent } from './tests/mp-zm/mp-zm.component';
import { FooterComponent } from './share/components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    GoogleComponent,
    FacebookComponent,
    FoodFrequencyComponent,
    CarCostComponent,
    AgeComponent,
    GenderComponent,
    CountryComponent,
    EducationComponent,
    IncomeComponent,
    NameComponent,
    NeoFfiComponent,
    LikertItemComponent,
    LinkerComponent,
    MpZmComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    AppMaterialModule,
    NgxsModule.forRoot([
      SurveyState
    ], { developmentMode: !environment.production }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
