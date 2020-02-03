import { Component, OnInit } from '@angular/core';
import { SynchronisationService } from '../synchronisation.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  constructor(private synchronisationService: SynchronisationService) {
    this.synchronisationService.requestResult();
  }

  ngOnInit() {
  }

}
