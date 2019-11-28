import { GenderScale, GenderBasic, GenderAdvanced } from '../enumerations/gender.enum';

export class Gender {
    scale: GenderScale;
    value: GenderBasic | GenderAdvanced;
}
