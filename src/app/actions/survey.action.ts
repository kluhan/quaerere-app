import { SurveyComponent } from '../share/types/surveyComponent.type';

// TODO Rework SurveyComponent-Type
export class SetComponent {
    static readonly type = '[SURVEY] Set Layout';
    constructor(public layout: SurveyComponent[]) {}
}

export class SetUID {
    static readonly type = '[SURVEY] Set UID';
    constructor(public uid: String) {}
}

export class SetToken {
    static readonly type = '[SURVEY] Set Token';
    constructor(public token: String) {}
}

// TODO Rework SurveyComponent-Type
export class SetDemographic {
    static readonly type = '[SURVEY] Set Demographic';
    constructor(public demographic: SurveyComponent) {}
}
