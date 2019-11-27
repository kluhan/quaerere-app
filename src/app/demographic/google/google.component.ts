import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, } from '@ngxs/store';
import { SetAge, SetGender, SetCountry, SetEducation, SetIncome, SetName, SetProfession } from 'src/app/actions/demographicData.action';
import { AgeScale, AgeRange20 } from 'src/app/models/demographic/age.enum';
import { GenderScale, GenderBasic, GenderAdvanced } from 'src/app/models/demographic/gender.enum';
import { CountryScale, DeuAutChe } from 'src/app/models/demographic/country.enum';
import { EducationGerman, EducationScale, EducationAcademic } from 'src/app/models/demographic/education.enum';
import { IncomeScale } from 'src/app/models/demographic/income.enum';
import { ProfessionBasic, ProfessionScale, ProfessionAdvanced } from 'src/app/models/demographic/profession.enum';

@Component({
  selector: 'app-google',
  templateUrl: './google.component.html',
  styleUrls: ['./google.component.scss']
})
export class GoogleComponent implements OnInit {

  googleForm: FormGroup;

  genderKeys: String[];
  genderLabelGenerator = GenderAdvanced;

  ageKeys: String[];
  ageLabelGenerator = AgeRange20;

  countryKeys: String[];


  constructor(private store: Store, private fb: FormBuilder) {}

  async ngOnInit() {
    this.genderKeys = Object.keys(GenderAdvanced);
    this.ageKeys = Object.keys(AgeRange20);
    this.countryKeys = Object.keys(DeuAutChe);

    this.googleForm = this.fb.group({
      company: 'Google',
      country: '',
      education: '',
      gender: '',
      state: '',
      firstName: '',
      lastName: '',
      age: '',
      'income': ['', Validators.pattern('^[0-9]*$') ],
    });


    const firstName = this.googleForm.get('firstName');
    const lastName = this.googleForm.get('lastName');
    const gender = this.googleForm.get('gender');
    const age = this.googleForm.get('age');
    const country = this.googleForm.get('country');
    const education = this.googleForm.get('education');
    const income = this.googleForm.get('income');

    firstName.valueChanges.subscribe(() => this.store.dispatch(new SetName(firstName.value, lastName.value)));
    lastName.valueChanges.subscribe(() => this.store.dispatch(new SetName(firstName.value, lastName.value)));
    // tslint:disable-next-line: max-line-length
    gender.valueChanges.subscribe(() => this.store.dispatch(new SetGender(<GenderAdvanced>GenderAdvanced[gender.value], GenderScale.ADVANCED)));
    age.valueChanges.subscribe(() => this.store.dispatch(new SetAge(<AgeRange20>AgeRange20[age.value], AgeScale.RANGE_20)));
    country.valueChanges.subscribe(() => this.store.dispatch(new SetCountry(<DeuAutChe>country.value, CountryScale.DEU_AUT_CHE)));
    education.valueChanges.subscribe(() => this.store.dispatch(new SetEducation(<EducationGerman>education.value, EducationScale.GERMAN)));
    income.valueChanges.subscribe(() => this.store.dispatch(new SetIncome(<Number>income.value, IncomeScale.BASIC)));

    this.store.dispatch(new SetAge(AgeRange20.BELOW_20, AgeScale.RANGE_20));
    this.store.dispatch(new SetGender(GenderBasic.MALE, GenderScale.BASIC));
    this.store.dispatch(new SetAge(25, AgeScale.BASIC));
    this.store.dispatch(new SetCountry(DeuAutChe.AUSTRIA, CountryScale.DEU_AUT_CHE));
    this.store.dispatch(new SetGender(GenderAdvanced.DIVERSE, GenderScale.ADVANCED));
    this.store.dispatch(new SetEducation(EducationGerman.HOCHSCHULREIFE, EducationScale.GERMAN));
    this.store.dispatch(new SetCountry(DeuAutChe.AUSTRIA, CountryScale.DEU_AUT_CHE));
    this.store.dispatch(new SetEducation(EducationAcademic.BACHELOR, EducationScale.ACADEMIC));
    this.store.dispatch(new SetIncome(50000, IncomeScale.RANGE_1000));
    this.store.dispatch(new SetIncome(1200, IncomeScale.BASIC));
    this.store.dispatch(new SetProfession(ProfessionBasic.STUDENT, ProfessionScale.BASIC));
    this.store.dispatch(new SetProfession(ProfessionAdvanced.FIREFIGHTER, ProfessionScale.ADVANCED));
  }

}
