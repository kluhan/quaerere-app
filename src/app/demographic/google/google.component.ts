import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store, } from '@ngxs/store';
import { AgeScale } from 'src/app/share/enumerations/age.enum';
import { GenderScale } from 'src/app/share/enumerations/gender.enum';
import { CountryScale } from 'src/app/share/enumerations/country.enum';
import { EducationScale } from 'src/app/share/enumerations/education.enum';
import { IncomeScale } from 'src/app/share/enumerations/income.enum';

@Component({
  selector: 'app-google',
  templateUrl: './google.component.html',
  styleUrls: ['./google.component.scss']
})
export class GoogleComponent implements OnInit {

  private googleForm: FormGroup;

  private ageScale = AgeScale.RANGE_20;
  private genderScale = GenderScale.BASIC;
  private countryScale = CountryScale.DEU_AUT_CHE;
  private educationScale = EducationScale.GERMAN;
  private incomeScale = IncomeScale.THREE_STEPS;

  constructor(private store: Store, private fb: FormBuilder) {}

  get formGroup() {
    return this.googleForm;
  }

  async ngOnInit() {
    this.googleForm = this.fb.group({
      company: 'Google',
    });
  }

}
