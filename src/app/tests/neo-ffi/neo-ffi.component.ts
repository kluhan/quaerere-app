import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store } from '@ngxs/store';
import { LikertScale } from 'src/app/share/enumerations/likert.enum';
import { Ocean } from 'src/app/share/enumerations/ocean.enum';
import { SetAnswer, SetScale } from 'src/app/actions/neoFfi.action';

@Component({
  selector: 'app-neo-ffi',
  templateUrl: './neo-ffi.component.html',
  styleUrls: ['./neo-ffi.component.scss']
})
export class NeoFfiComponent implements AfterViewInit {

  neoFfiForm: FormGroup;
  scale = LikertScale.LIKERT_FIVE_LEVEL;
  ocean = Ocean;

  questions = [
    ['q1', 1, Ocean.AGREEABLENESS, 'Wait', ],
    ['q2', 1, Ocean.CONSCIENTIOUSNESS, 'Test', ],
    ['q3', 2, Ocean.CONSCIENTIOUSNESS, 'Redo', ],
    ['q4', 1, Ocean.EXTRAVERSION, 'Play Game', ],
    ['q5', 1, Ocean.NEUROTICISM, 'Sleep', ],
  ];

  constructor(private store: Store, private fb: FormBuilder) {
    this.neoFfiForm = this.fb.group({});
    store.dispatch(new SetScale(this.scale));
  }

  async ngAfterViewInit() {
    this.questions.forEach(question => {
      this.neoFfiForm.get(question[0].toString()).valueChanges.subscribe(value =>
        this.store.dispatch(new SetAnswer(value, Number(question[1]), <Ocean>question[2] ))
      )
    });

  }

}
