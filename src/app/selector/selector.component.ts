import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, FormControl, AbstractControl } from '@angular/forms';
import { Survey } from '../share/models/survey.model';
import { Store } from '@ngxs/store';
import { SetComponent, SetToken, SetUID } from '../actions/survey.action';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SynchronisationService } from '../synchronisation.service';

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
  constructor(private synchronisationService: SynchronisationService, private firestore: AngularFirestore, private fb: FormBuilder, private store: Store, private router: Router) {
    this.selectorForm = this.fb.group({});
    this.selectorForm.addControl('token', new FormControl(''));
    this.tokenController = this.selectorForm.get('token');
  }

  requestAccess(): void {
    this.isLoading = true;
    this.synchronisationService.requestAccess(this.tokenController.value).then(result => {
      if(result){
        this.router.navigate(['linker']);
        this.isLoading = false;
      } else {
        this.tokenController.setErrors({'incorrect': true});
        this.isLoading = false;
      }
    }

    );
  }
}
