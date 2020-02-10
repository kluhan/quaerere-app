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
import { SelectorComponent } from './selector/selector.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { HttpClientModule } from '@angular/common/http';
import { ResultComponent } from './result/result.component';
import { ChartsModule } from 'ng2-charts';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TokenDialogComponent } from './share/components/token-dialog/token-dialog.component';
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    GoogleComponent,
    FacebookComponent,
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
    SelectorComponent,
    ResultComponent,
    DashboardComponent,
    TokenDialogComponent,
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
    NgxsLoggerPluginModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireFunctionsModule,
    HttpClientModule,
    ChartsModule,
    ClipboardModule,
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent],
  entryComponents: [TokenDialogComponent],
})
export class AppModule { }
