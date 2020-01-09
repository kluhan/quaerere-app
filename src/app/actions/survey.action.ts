import { SurveyComponent } from '../share/types/surveyComponent.type';

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
