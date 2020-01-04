import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Survey } from '../share/models/survey.model';
import { Store } from '@ngxs/store';
import { SetLayout } from '../actions/survey.action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent {

  selectorForm: FormGroup;
  survey: Observable<Survey>;
  tokenValidity: Boolean;

  constructor(firestore: AngularFirestore, private fb: FormBuilder, private store: Store, private router: Router) {
    this.selectorForm = this.fb.group({});
    this.selectorForm.addControl('token', new FormControl(''));
    const token = this.selectorForm.get('token');

    token.valueChanges.subscribe(() => {
      if (token.value !== undefined && token.value !== '') {
        this.survey = firestore.collection('token').doc<Survey>(token.value).valueChanges();
        this.survey.subscribe(sur => {
          if (sur !== undefined) {
            store.dispatch(new SetLayout(sur.layout));
            // router.navigate(['linker']);
            this.tokenValidity = true;
            if (token.enabled){
              token.disable();
            }
          }
        });
      }
    });
  }

}
