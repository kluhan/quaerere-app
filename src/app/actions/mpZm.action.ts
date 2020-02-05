import { LikertScale, LikertThreeLevel, LikertFiveLevel } from '../share/enumerations/likert.enum';
import { Zurich } from '../share/enumerations/zurich.enum';
import { MpZmResult } from '../share/models/mp-zm.model';

export class SetScale {
    static readonly type = '[MP_ZM] Set Scale';
    constructor(public scale: LikertScale, ) {}
}

export class SetAnswer {
    static readonly type = '[MP_ZM] Set Answer';
    constructor(public value: LikertThreeLevel | LikertFiveLevel, public question: Number, public factor: Zurich) {}
}

export class SetResult {
    static readonly type = '[MP_ZM] Set Result';
    constructor(public result: MpZmResult) {}
}
