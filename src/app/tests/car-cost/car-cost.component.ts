import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-car-cost',
  templateUrl: './car-cost.component.html',
  styleUrls: ['./car-cost.component.scss']
})
export class CarCostComponent implements OnInit {

  carCostForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.carCostForm = this.fb.group({
      brand: '',
      color: '',
      cost: '',
      });
    // CONSOLE-LOG-DEBUG
    this.carCostForm.valueChanges.subscribe(console.log);
  }

}
