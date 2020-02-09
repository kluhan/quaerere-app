import { Component, OnInit, Inject } from '@angular/core';
import { TokenType } from '../../enumerations/token-type.enum';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Token } from '../../models/token.model';
import { Survey } from '../../models/survey.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-token-dialog',
  templateUrl: './token-dialog.component.html',
  styleUrls: ['./token-dialog.component.scss']
})
export class TokenDialogComponent implements OnInit {

  TokenTypeOptions = TokenType;
  private tokenForm: FormGroup;
  private showLimit: Boolean = false;
  private surveyID: String;

  // tslint:disable-next-line: max-line-length
  constructor( private firestore: AngularFirestore, private formBuilder: FormBuilder, private dialogRef: MatDialogRef<TokenDialogComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.surveyID = data.surveyID;
}

  ngOnInit() {
    this.tokenForm = this.formBuilder.group({
      type: '',
      name: '',
      limit: '',
    });

    this.tokenForm.get('type').valueChanges.subscribe(type => {
      // tslint:disable-next-line: triple-equals
      if (type == TokenType.VOLUME) {
        this.showLimit = true;
      } else {
        this.showLimit = false;
        this.tokenForm.get('limit').setValue(0);
      }
    });
  }

  discard() {
    this.dialogRef.close();
  }

  async save() {
    // tslint:disable-next-line: prefer-const
    let newToken: Token = {
      count: 0,
      name: this.tokenForm.get('name').value,
      type: this.tokenForm.get('type').value,
      limit: this.tokenForm.get('limit').value,
    };
    console.log(newToken);

    const tokenDoc = await this.firestore.collection('token').add(newToken);
    const surveyRef = await this.firestore.collection('survey').doc(this.surveyID.toString());

    const survey = <Survey>(await (await surveyRef.get()).toPromise()).data();
    survey.token.push(tokenDoc.id);
    surveyRef.update(survey);
    this.dialogRef.close();
  }

}
