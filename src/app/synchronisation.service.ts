import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { NeoFfi } from './share/models/neo-ffi.model';
import { isUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class SynchronisationService {

  constructor(private store: Store,  private firestore: AngularFirestore) {
  }

  registerData(data$: Observable<any>, collection: String, ) {
    const uid = this.store.selectSnapshot<String>(state => state.surveyState.configuration.uid).toString();
    const docRef = this.firestore.collection(collection.toString()).doc(uid).ref;
    data$.subscribe(data => {
      console.log(data);
      
      docRef.update(data);
    });
  }

  }

