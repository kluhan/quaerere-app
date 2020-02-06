import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { SetComponent, SetToken, SetUID, SetDemographic } from './actions/survey.action';
import { Router } from '@angular/router';
import { SetResult as SetResultNeoFfi} from './actions/neoFfi.action';
import { SetResult as SetResultMpZm } from './actions/mpZm.action';

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
      if (data !== null && data !== undefined) {
        docRef.update(data);
      }
    });
  }

  // TODO rework duplicate code
  registerTestData(data$: Observable<any>, collection: String, ) {
    const uid = this.store.selectSnapshot<String>(state => state.surveyState.configuration.uid).toString();
    const docRef = this.firestore.collection(collection.toString()).doc(uid).ref;
    data$.subscribe(data => {
      if (data !== null && data !== undefined) {
        docRef.update(data);
      }
    });
  }

  // TODO Add custom Error
  async requestResult() {
    const uid = this.store.selectSnapshot<String>(state => state.surveyState.configuration.uid).toString();
    const token = this.store.selectSnapshot<String>(state => state.surveyState.configuration.token).toString();
    try {
      // tslint:disable-next-line: max-line-length
      const response: any = await this.httpClient.post('https://us-central1-quaerere-app.cloudfunctions.net/finishSurvey', { 'token': token.toString(), 'uid': uid.toString() }, {responseType: 'text'}).toPromise();
    } catch (error) {
      console.log(error);
    } finally {
      const resultRef = this.firestore.collection('result').doc(uid).valueChanges();
      resultRef.subscribe((result: any) => {
        try {
          if ('neo_ffi' in result) {
            this.store.dispatch(new SetResultNeoFfi(result.neo_ffi));
          }
          if ('mp_zm' in result) {
            this.store.dispatch(new SetResultMpZm(result.mp_zm));
          }
          if ('demographic' in result) {
            this.store.dispatch(new SetDemographic(result.demographic));
          }
        } catch (error) {
          console.log('Document not ready');
        }
      });
    }
  }

}

