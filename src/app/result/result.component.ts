import { Component, OnInit } from '@angular/core';
import { SynchronisationService } from '../synchronisation.service';
import { Store } from '@ngxs/store';
import { NeoFfiResult } from '../share/models/neo-ffi.model';
import { MpZmResult } from '../share/models/mp-zm.model';
import { SurveyComponent } from '../share/types/surveyComponent.type';
import { Tests } from '../share/enumerations/tests.enum';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  components: Array<SurveyComponent>;
  neoFfiResult: NeoFfiResult;
  mpZmResult: MpZmResult;

  isNeoFfiLoaded = false;
  isMpZmLoaded = false;

  constructor(private synchronisationService: SynchronisationService, private store: Store) {
    this.synchronisationService.requestResult();

    this.components = this.store.selectSnapshot(state => state.surveyState.configuration.components);

    if (this.components.includes(Tests.NEO_FFI)) {
      this.store.select<NeoFfiResult>(state => state.surveyState.result.neo_ffi).subscribe(result => {
        this.neoFfiResult = result;
        if(result !== null){
          this.isNeoFfiLoaded = true;
        }
        console.log(result);
      });
    }
    if (this.components.includes(Tests.MP_ZM)) {
      this.store.select<MpZmResult>(state => state.surveyState.result.mp_zm).subscribe(result => {
        this.mpZmResult = result;
        if(result !== null){
          this.isMpZmLoaded = true;
        }
        console.log(result);
      });
    }
  }

  ngOnInit() {
  }

}
