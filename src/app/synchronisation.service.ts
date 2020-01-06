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
    this.firestore
            .collection(collection.toString())
            .add({'token': 'not_implemented'})
            .then((docRef: DocumentReference) => {
              data$.subscribe(data => {
                docRef.update(data);
              });
            });
  }

  }

