import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AgeScale } from 'src/app/share/enumerations/age.enum';
import { GenderScale } from 'src/app/share/enumerations/gender.enum';
import { CountryScale } from 'src/app/share/enumerations/country.enum';
import { EducationScale } from 'src/app/share/enumerations/education.enum';
import { IncomeScale } from 'src/app/share/enumerations/income.enum';

@Component({
  selector: 'app-facebook',
  templateUrl: './facebook.component.html',
  styleUrls: ['./facebook.component.scss']
})
export class FacebookComponent implements OnInit {

  private facebookForm: FormGroup;

  private ageScale = AgeScale.BASIC;
  private genderScale = GenderScale.ADVANCED;
  private countryScale = CountryScale.DEU_AUT_CHE;
  private educationScale = EducationScale.ACADEMIC;
  private incomeScale = IncomeScale.RANGE_10000;

  constructor(private fb: FormBuilder) {}

  get formGroup() {
    return this.facebookForm;
  }

  async ngOnInit() {
    this.facebookForm = this.fb.group({
      company: 'Facebook',
    });
  }
}
