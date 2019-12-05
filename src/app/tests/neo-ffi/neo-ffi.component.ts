import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store } from '@ngxs/store';
import { LikertScale } from 'src/app/share/enumerations/likert.enum';

@Component({
  selector: 'app-neo-ffi',
  templateUrl: './neo-ffi.component.html',
  styleUrls: ['./neo-ffi.component.scss']
})
export class NeoFfiComponent implements OnInit {

  neoFfiForm: FormGroup;
  scale = LikertScale.LIKERT_THREE_LEVEL;

  constructor(private store: Store, private fb: FormBuilder) {}

  async ngOnInit() {

    this.neoFfiForm = this.fb.group({});

  }

}
