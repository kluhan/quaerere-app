import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-food-frequency',
  templateUrl: './food-frequency.component.html',
  styleUrls: ['./food-frequency.component.scss']
})
export class FoodFrequencyComponent implements OnInit {

  foodFrequencyForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.foodFrequencyForm = this.fb.group({
      type: '',
      amount: '',
      color: '',
      });
    // CONSOLE-LOG-DEBUG
    this.foodFrequencyForm.valueChanges.subscribe(console.log);
  }

}
