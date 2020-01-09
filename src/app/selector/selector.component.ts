import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, FormControl, AbstractControl } from '@angular/forms';
import { Survey } from '../share/models/survey.model';
import { Store } from '@ngxs/store';
import { SetComponent, SetToken, SetUID } from '../actions/survey.action';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent {

  selectorForm: FormGroup;
  survey: Observable<Survey>;
  data$: Observable<any>;
  tokenController: AbstractControl;
  isLoading = false;

  // tslint:disable-next-line: max-line-length
  constructor(private http: HttpClient, private firestore: AngularFirestore, private fb: FormBuilder, private store: Store, private router: Router) {
    this.selectorForm = this.fb.group({});
    this.selectorForm.addControl('token', new FormControl(''));
    this.tokenController = this.selectorForm.get('token');
  }

  requestAccess(): void {
    this.isLoading = true;
    this.data$ = this.http.post('https://us-central1-quaerere-app.cloudfunctions.net/getToken', { 'token': this.tokenController.value });
    this.data$.subscribe(
      (data) => {
        console.log(data);
        this.store.dispatch(new SetComponent(data.layout));
        this.store.dispatch(new SetToken(data.token));
        this.store.dispatch(new SetUID(data.uid));
        this.router.navigate(['linker']);
        this.isLoading = false;
      },
      error => {
        this.tokenController.setErrors({'incorrect': true});
        this.isLoading = false;
      }
      );
  }
}
