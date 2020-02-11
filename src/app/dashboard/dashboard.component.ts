import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Survey } from '../share/models/survey.model';
import { Token } from '../share/models/token.model';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { TokenDialogComponent } from '../share/components/token-dialog/token-dialog.component';
import { SurveyDialogComponent } from '../share/components/survey-dialog/survey-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  surveyData: Array<{ survey: Survey, surveyID: String, token: {tokenDocument: Token, tokenID: String}[]}>;
  tokenMap: Map<String, Token> = new Map;

  constructor(private firestore: AngularFirestore, private dialog: MatDialog) {
    this.sync();
  }

  async sync() {
    const surveyPromise = await this.firestore.collection('survey').get().toPromise();
    const tokenPromise = await this.firestore.collection('token').get().toPromise();

    surveyPromise.docs.forEach(doc => {
      console.log(doc.data());
    });

    tokenPromise.docs.forEach(tokenDoc => {
      console.log(tokenDoc.data());
      this.tokenMap.set(tokenDoc.id, <Token>tokenDoc.data());
    });
    this.surveyData = [];
    surveyPromise.docs.forEach(surveyDoc => {
      const surveyDocData = <Survey>surveyDoc.data();
      const surveyToken = new Array;
      surveyDocData.token.forEach(token => {
        surveyToken.push({tokenDocument: this.tokenMap.get(token), tokenID: token});
      });
      this.surveyData.push({survey: surveyDocData, surveyID: surveyDoc.id, token: surveyToken});
    });

  }

  openTokenDialog(surveyID: String) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      surveyID: surveyID,
    };

    const dialogRef = this.dialog.open(TokenDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((value) => {
        this.sync();
      });
  }

  openSurveyDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(SurveyDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((value) => {
        this.sync();
      });
  }

  ngOnInit() {
  }

}
