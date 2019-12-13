import { Component, OnInit, Input } from '@angular/core';
import { SetIncome } from 'src/app/actions/demographicData.action';
import { IncomeScale, IncomeThreeSteps } from 'src/app/share/enumerations/income.enum';
import { FormGroup, FormControl, Validators, } from '@angular/forms';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-demographic-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit {

  @Input()
  scale: IncomeScale;

  @Input()
  parentForm: FormGroup;

  scaleOptions = IncomeScale;
  threeStepsOptions = IncomeThreeSteps;

  constructor(private store: Store) { }

  ngOnInit() {
    this.parentForm.addControl('income', new FormControl('', Validators.required));
    const education = this.parentForm.get('income');
    education.valueChanges.subscribe(() => this.store.dispatch(new SetIncome(education.value, this.scale)));
  }

}