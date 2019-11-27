import { Component, OnInit, Input } from '@angular/core';
import { GenderScale, GenderBasic, GenderAdvanced } from 'src/app/models/demographic/gender.enum';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { SetGender } from 'src/app/actions/demographicData.action';

@Component({
  selector: 'app-demographic-gender',
  templateUrl: './gender.component.html',
  styleUrls: ['./gender.component.scss']
})
export class GenderComponent implements OnInit {

  @Input()
  scale: GenderScale;

  @Input()
  parentForm: FormGroup;

  scaleOptions = GenderScale;
  genderOptionsBasic = GenderBasic;
  genderOptionsAdvanced = GenderAdvanced;

  constructor(private store: Store) { }

  ngOnInit() {
    this.parentForm.addControl('gender', new FormControl('', Validators.required));
    const gender = this.parentForm.get('gender');
    gender.valueChanges.subscribe(() => this.store.dispatch(new SetGender(gender.value, this.scale)));
  }
}
