import { Component, OnInit, Input } from '@angular/core';
import { LikertScale, LikertFiveLevel, LikertThreeLevel } from '../../enumerations/likert.enum';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-likert-item',
  templateUrl: './likert-item.component.html',
  styleUrls: ['./likert-item.component.scss']
})
export class LikertItemComponent implements OnInit {

  @Input()
  scale: LikertScale;

  @Input()
  questionString: String;

  @Input()
  parentForm: FormGroup;

  @Input()
  controlName: String;

  scaleOptions = LikertScale;
  likertFiveLevel = LikertFiveLevel;
  likertThreeLevel = LikertThreeLevel;

  constructor(private store: Store) { }

  ngOnInit() {
    this.parentForm.addControl( this.controlName.toString(), new FormControl('', Validators.required));
  }
}
