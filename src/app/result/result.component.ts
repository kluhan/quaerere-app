import { Component, OnInit } from '@angular/core';
import { SynchronisationService } from '../synchronisation.service';
import { Store } from '@ngxs/store';
import { NeoFfiResult } from '../share/models/neo-ffi.model';
import { MpZmResult } from '../share/models/mp-zm.model';
import { SurveyComponent } from '../share/types/surveyComponent.type';
import { Tests } from '../share/enumerations/tests.enum';
import { RadialChartOptions, ChartDataSets, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

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
  public radarChartOptions: RadialChartOptions = {
    responsive: true,
    legend: {
      display: false,
    },
    tooltips: {
      enabled: false,
    },
    scale: {
      angleLines: {
        display: false,
      },
      ticks: {
        display: false,
      }
    },
    elements: {
      point: {
          radius: 0
      }
  }
  };
  // tslint:disable-next-line: max-line-length
  public neoFfiChartLabels: Label[] = ['Neurotizismus', 'Extraversion', 'Offenheit für Erfahrung', 'Verträglichkeit', 'Gewissenhaftigkeit', ];
  public neoFfiChartData: ChartDataSets[] = null;
  public neoFfiChartType: ChartType = 'radar';


  // tslint:disable-next-line: max-line-length
  public mpZmChartLabels: Label[] = ['Sicherheit', 'Unternehmungslust', 'Macht', 'Geltung', 'Leistung', ];
  public mpZmChartData: ChartDataSets[] = null;
  public mpZmChartType: ChartType = 'radar';


  constructor(private synchronisationService: SynchronisationService, private store: Store, ) {
    this.synchronisationService.requestResult();

    this.components = this.store.selectSnapshot(state => state.surveyState.configuration.components);

    if (this.components.includes(Tests.NEO_FFI)) {
      this.store.select<NeoFfiResult>(state => state.surveyState.result.neo_ffi).subscribe(result => {
        this.neoFfiResult = result;
        if (result !== null) {
          this.updateNeoFfiChart();
          this.isNeoFfiLoaded = true;
        }
        console.log(result);
      });
    }
    if (this.components.includes(Tests.MP_ZM)) {
      this.store.select<MpZmResult>(state => state.surveyState.result.mp_zm).subscribe(result => {
        this.mpZmResult = result;
        if (result !== null) {
          this.updateMpZmChart();
          this.isMpZmLoaded = true;
        }
        console.log(result);
      });
    }
  }

  updateNeoFfiChart() {
    this.neoFfiChartData = [
      {
        data: [
          this.neoFfiResult.neuroticism.valueOf(),
          this.neoFfiResult.extraversion.valueOf(),
          this.neoFfiResult.openness.valueOf(),
          this.neoFfiResult.agreeableness.valueOf(),
          this.neoFfiResult.conscientiousness.valueOf(),
        ],
        backgroundColor: '#9c27b070',
        borderColor: '#9c27b0',
      },
    ];
  }

  updateMpZmChart() {
    this.mpZmChartData = [
      {
        data: [
          this.mpZmResult.safety.valueOf(),
          this.mpZmResult.initiative.valueOf(),
          this.mpZmResult.might.valueOf(),
          this.mpZmResult.repute.valueOf(),
          this.mpZmResult.accomplishment.valueOf(),
        ],
        backgroundColor: '#9c27b070',
        borderColor: '#9c27b0' },
    ];
  }

  ngOnInit() {
  }

}
