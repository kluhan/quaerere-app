import { SurveyComponent } from '../share/types/surveyComponent.type';

export class SetLayout {
    static readonly type = '[SURVEY] Set Layout';
    constructor(public layout: SurveyComponent[]) {}
}
