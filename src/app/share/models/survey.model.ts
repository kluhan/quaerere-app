import { SurveyComponent } from '../types/surveyComponent.type';
import { Demographic } from '../enumerations/demographic.enum';

export class Survey {
    layout: SurveyComponent[];
    date: String;
    demographic: Demographic;
    name: String;
    token: Array<String>;


}
