import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store, } from '@ngxs/store';
import { AgeScale } from 'src/app/models/demographic/age.enum';
import { GenderScale } from 'src/app/models/demographic/gender.enum';
import { CountryScale } from 'src/app/models/demographic/country.enum';
import { EducationScale } from 'src/app/models/demographic/education.enum';
import { IncomeScale } from 'src/app/models/demographic/income.enum';

@Component({
  selector: 'app-google',
  templateUrl: './google.component.html',
  styleUrls: ['./google.component.scss']
})
export class GoogleComponent implements OnInit {

  googleForm: FormGroup;

  ageScale = AgeScale.RANGE_20;
  genderScale = GenderScale.BASIC;
  countryScale = CountryScale.DEU_AUT_CHE;
  educationScale = EducationScale.GERMAN;
  incomeScale = IncomeScale.RANGE_500;

  constructor(private store: Store, private fb: FormBuilder) {}

  async ngOnInit() {

    this.googleForm = this.fb.group({
      company: 'Google',
    });

  }

}