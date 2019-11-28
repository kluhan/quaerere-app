import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AgeScale } from 'src/app/share/enumerations/age.enum';
import { GenderScale } from 'src/app/share/enumerations/gender.enum';
import { CountryScale } from 'src/app/share/enumerations/country.enum';
import { EducationScale } from 'src/app/share/enumerations/education.enum';
import { IncomeScale } from 'src/app/share/enumerations/income.enum';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-facebook',
  templateUrl: './facebook.component.html',
  styleUrls: ['./facebook.component.scss']
})
export class FacebookComponent implements OnInit {

  facebookForm: FormGroup;

  ageScale = AgeScale.BASIC;
  genderScale = GenderScale.ADVANCED;
  countryScale = CountryScale.DEU_AUT_CHE;
  educationScale = EducationScale.ACADEMIC;
  incomeScale = IncomeScale.RANGE_1000;

  constructor(private fb: FormBuilder) {}

  async ngOnInit() {

    this.facebookForm = this.fb.group({
      company: 'Facebook',
    });

  }
}
