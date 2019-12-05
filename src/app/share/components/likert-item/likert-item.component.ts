import { Component, OnInit, Input } from '@angular/core';
import { LikertScale, LikertFiveLevel, LikertThreeLevel } from '../../enumerations/likert.enum';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-likert-item',
  templateUrl: './likert-item.component.html',
  styleUrls: ['./likert-item.component.scss']
})
export class LikertItemComponent implements OnInit {

  @Input()
  scale: LikertScale;

  @Input()
  question: String;

  @Input()
  parentForm: FormGroup;

  @Input()
  controlName: String;

  scaleOptions = LikertScale;
  likertFiveLevel = LikertFiveLevel;
  likertThreeLevel = LikertThreeLevel;

  constructor() { }

  ngOnInit() {
    this.parentForm.addControl( this.controlName.toString(), new FormControl('', Validators.required));
    const likert = this.parentForm.get(this.controlName.toString());
    likert.valueChanges.subscribe(() => console.log(likert.value));
  }

}
