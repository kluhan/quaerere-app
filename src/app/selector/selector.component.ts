import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent implements OnInit {
  // TODO generate SurveyModel
  selectorForm: FormGroup;
  items: Observable<any>;

  constructor(firestore: AngularFirestore, private fb: FormBuilder) {
    firestore.collection('token').doc('CMiLQAiz5WXW4HzzMUVb').valueChanges().subscribe(data => {
      console.log(data);
     });
  }

  async ngOnInit() {
    this.selectorForm = this.fb.group({
      company: 'Google',
    });
  }

}
