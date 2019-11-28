import { Component, OnInit, Input } from '@angular/core';
import { AgeScale, AgeRange20 } from 'src/app/share/enumerations/age.enum';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { SetAge } from 'src/app/actions/demographicData.action';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-demographic-age',
  templateUrl: './age.component.html',
  styleUrls: ['./age.component.scss']
})
export class AgeComponent implements OnInit {

  @Input()
  scale: AgeScale;

  @Input()
  parentForm: FormGroup;

  scaleOptions = AgeScale;
  rangeOptions = AgeRange20;

  constructor(private store: Store) { }

  ngOnInit() {
    this.parentForm.addControl('age', new FormControl('', Validators.required));
    const age = this.parentForm.get('age');
    age.valueChanges.subscribe(() => this.store.dispatch(new SetAge(age.value, this.scale)));
  }

}
