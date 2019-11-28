import { Component, OnInit, Input } from '@angular/core';
import { EducationGerman, EducationScale, EducationAcademic } from 'src/app/models/demographic/education.enum';
import { SetEducation } from 'src/app/actions/demographicData.action';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-demographic-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {

  @Input()
  scale: EducationScale;

  @Input()
  parentForm: FormGroup;

  scaleOptions = EducationScale;
  educationOptionsGerman = EducationGerman;
  educationOptionsAcademic = EducationAcademic;

  constructor(private store: Store) { }

  ngOnInit() {
    this.parentForm.addControl('education', new FormControl('', Validators.required));
    const education = this.parentForm.get('education');
    education.valueChanges.subscribe(() => this.store.dispatch(new SetEducation(education.value, this.scale)));
  }

}
