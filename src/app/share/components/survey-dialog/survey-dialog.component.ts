import { Component, OnInit, Inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TokenDialogComponent } from '../token-dialog/token-dialog.component';
import { Tests } from '../../enumerations/tests.enum';
import { Demographic } from '../../enumerations/demographic.enum';
import { Survey } from '../../models/survey.model';

@Component({
  selector: 'app-survey-dialog',
  templateUrl: './survey-dialog.component.html',
  styleUrls: ['./survey-dialog.component.scss']
})
export class SurveyDialogComponent implements OnInit {

  private testOptions = Tests;
  private demographicOptions = Demographic;
  private surveyForm: FormGroup;

  // tslint:disable-next-line: max-line-length
  constructor( private firestore: AngularFirestore, private formBuilder: FormBuilder, private dialogRef: MatDialogRef<TokenDialogComponent>, @Inject(MAT_DIALOG_DATA) data) {}

  ngOnInit() {
    this.surveyForm = this.formBuilder.group({
      name: '',
      demographic: '',
      neo_ffi: '',
      mp_zm: '',
    });

    this.surveyForm.valueChanges.subscribe(value => {
      console.log(this.surveyForm.value);
    });
  }

  discard() {
    this.dialogRef.close();
  }

  async save() {
    // tslint:disable-next-line: prefer-const
    let newSurvey: Survey = {
      name: this.surveyForm.get('name').value,
      demographic: this.surveyForm.get('demographic').value,
      layout: [],
      date: new Date(),
      token: [],
    };
    if (this.surveyForm.get('mp_zm').value) {
      newSurvey.layout.push(Tests.MP_ZM);
    }
    if (this.surveyForm.get('neo_ffi').value) {
      newSurvey.layout.push(Tests.NEO_FFI);
    }
    console.log(newSurvey);

    const surveyDoc = await this.firestore.collection('survey').add(newSurvey);
    this.dialogRef.close();
  }

}
