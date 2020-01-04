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

  get formGroup() {
    return this.carCostForm;
  }

  ngOnInit() {
    this.carCostForm = this.fb.group({
      brand: '',
      color: '',
      cost: '',
      });
  }

}
