import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store, Select, } from '@ngxs/store';
import { AgeScale } from 'src/app/share/enumerations/age.enum';
import { GenderScale } from 'src/app/share/enumerations/gender.enum';
import { CountryScale } from 'src/app/share/enumerations/country.enum';
import { EducationScale } from 'src/app/share/enumerations/education.enum';
import { IncomeScale } from 'src/app/share/enumerations/income.enum';
import { Observable } from 'rxjs';
import { SynchronisationService } from 'src/app/synchronisation.service';

@Component({
  selector: 'app-google',
  templateUrl: './google.component.html',
  styleUrls: ['./google.component.scss']
})
export class GoogleComponent implements OnInit {

  @Select(state => state.surveyState.demographicData) data$: Observable<any>;
  private googleForm: FormGroup;

  private ageScale = AgeScale.RANGE_20;
  private genderScale = GenderScale.BASIC;
  private countryScale = CountryScale.DEU_AUT_CHE;
  private educationScale = EducationScale.GERMAN;
  private incomeScale = IncomeScale.THREE_STEPS;

  constructor(private store: Store, private fb: FormBuilder, private synchronisationService: SynchronisationService) {
    synchronisationService.registerData(this.data$, 'demographic');
    this.data$.subscribe(data => {console.log(data);});
  }

  get formGroup() {
    return this.googleForm;
  }

  async ngOnInit() {
    this.googleForm = this.fb.group({
      company: 'Google',
    });
  }

}
