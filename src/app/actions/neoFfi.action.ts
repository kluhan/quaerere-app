import { LikertScale, LikertThreeLevel, LikertFiveLevel } from '../share/enumerations/likert.enum';
import { Ocean } from '../share/enumerations/ocean.enum';
import { NeoFfiResult } from '../share/models/neo-ffi.model';

export class SetScale {
    static readonly type = '[NEO-FFI] Set Scale';
    constructor(public scale: LikertScale, ) {}
}

export class SetAnswer {
    static readonly type = '[NEO-FFI] Set Answer';
    constructor(public value: LikertThreeLevel | LikertFiveLevel, public question: Number, public factor: Ocean) {}
}

export class SetResult {
    static readonly type = '[NEO-FFI] Set Result';
    constructor(public result: NeoFfiResult) {}
}