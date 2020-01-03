import { LikertScale, LikertThreeLevel, LikertFiveLevel } from '../share/enumerations/likert.enum';
import { Zurich } from '../share/enumerations/zurich.enum';

export class SetScale {
    static readonly type = '[ZM-SM] Set Scale';
    constructor(public scale: LikertScale, ) {}
}

export class SetAnswer {
    static readonly type = '[ZM-SM] Set Answer';
    constructor(public value: LikertThreeLevel | LikertFiveLevel, public question: Number, public factor: Zurich) {}
}