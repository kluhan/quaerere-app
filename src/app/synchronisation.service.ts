import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { SetComponent, SetToken, SetUID, SetDemographic } from './actions/survey.action';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SynchronisationService {

  constructor(private store: Store,  private firestore: AngularFirestore, private httpClient: HttpClient, private router: Router) {
  }

  // TODO generate model and check response
  async requestAccess(token: String) {
    try {
      // tslint:disable-next-line: max-line-length
      const response: any = await this.httpClient.post('https://us-central1-quaerere-app.cloudfunctions.net/getToken', { 'token': token.toString() }).toPromise();
      this.store.dispatch(new SetComponent(response.layout));
      this.store.dispatch(new SetDemographic(response.demographic));
      this.store.dispatch(new SetToken(response.token));
      this.store.dispatch(new SetUID(response.uid));
      return true;
    } catch {
      return false;
    }
  }

  // TODO rework duplicate code
  registerDemographicData(data$: Observable<any>) {
    const uid = this.store.selectSnapshot<String>(state => state.surveyState.configuration.uid).toString();
    const docRef = this.firestore.collection('demographic').doc(uid).ref;
    data$.subscribe(data => {
      docRef.update(data);
    });
  }

  // TODO rework duplicate code
  registerTestData(data$: Observable<any>, collection: String, ) {
    const uid = this.store.selectSnapshot<String>(state => state.surveyState.configuration.uid).toString();
    const docRef = this.firestore.collection(collection.toString()).doc(uid).ref;
    data$.subscribe(data => {
      docRef.update(data);
    });
  }

  }

