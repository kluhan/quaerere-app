import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { SetName } from 'src/app/actions/demographicData.action';

@Component({
  selector: 'app-demographic-name',
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.scss']
})
export class NameComponent implements OnInit {

  @Input()
  parentForm: FormGroup;

  constructor(private store: Store) { }

  ngOnInit() {
    this.parentForm.addControl('firstName', new FormControl('', Validators.required));
    this.parentForm.addControl('lastName', new FormControl('', Validators.required));
    const firstName = this.parentForm.get('firstName');
    const lastName = this.parentForm.get('lastName');
    firstName.valueChanges.subscribe(() => this.store.dispatch(new SetName(firstName.value, lastName.value)));
    lastName.valueChanges.subscribe(() => this.store.dispatch(new SetName(firstName.value, lastName.value)));
  }
}