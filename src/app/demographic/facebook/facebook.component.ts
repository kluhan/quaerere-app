import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-facebook',
  templateUrl: './facebook.component.html',
  styleUrls: ['./facebook.component.scss']
})
export class FacebookComponent implements OnInit {

  facebookForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.facebookForm = this.fb.group({
      company: 'Facebook',
      position: '',
      birthdate: '',
      deegre: '',
      address: '',
      city: '',
      state: '',
      postCode: ''
    });

    this.facebookForm.addControl('name',
      new FormControl('', [
        Validators.required])
    );

    this.facebookForm.addControl('email',
      new FormControl('', [
        Validators.required,
        Validators.email])
    );

    // CONSOLE-LOG-DEBUG
    this.facebookForm.valueChanges.subscribe(console.log);
  }

  get nameControl() { return this.facebookForm.get('name'); }

  get emailControl() { return this.facebookForm.get('email'); }
}
