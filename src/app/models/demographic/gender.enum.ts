export class DemographicGender {
    // Required
    scale: GenderScale;
    value: GenderBasic | GenderAdvanced;
}

export enum GenderBasic {
    MALE = 'male',
    FEMALE = 'female',
}

export enum GenderAdvanced {
    MALE = 'male',
    FEMALE = 'female',
    DIVERSE = 'diverse',
}

export enum GenderScale {
    BASIC,
    ADVANCED,
}
