import { NeoFfiResult } from './neo-ffi.model';
import { MpZmResult } from './mp-zm.model';

export class Result {
    neo_ffi: NeoFfiResult;
    mp_zm: MpZmResult;
    demographic: any;
    token: String;
}
