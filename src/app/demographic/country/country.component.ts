import { Component, OnInit, Input } from '@angular/core';
import { SetCountry } from 'src/app/actions/demographicData.action';
import { CountryScale, DeuAutChe } from 'src/app/models/demographic/country.enum';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-demographic-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {

  @Input()
  scale: CountryScale;

  @Input()
  parentForm: FormGroup;

  scaleOptions = CountryScale;
  countryOptionsDeuAutChe = DeuAutChe;

  constructor(private store: Store) { }

  ngOnInit() {
    this.parentForm.addControl('country', new FormControl('', Validators.required));
    const country = this.parentForm.get('country');
    country.valueChanges.subscribe(() => this.store.dispatch(new SetCountry(country.value, this.scale)));
  }

}
