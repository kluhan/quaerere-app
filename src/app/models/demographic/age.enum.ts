export class DemographicAge {
    scale: AgeScale;
    value: Number;
}

export enum AgeScale {
    BASIC,
    RANGE_20,
}

export enum AgeRange20 {
    BELOW_20 = '0-20',
    TWENTY_TO_THIRTYNINE = '20-39',
    FORTY_TO_FIFTYNINE = '40-59',
    SIXTY_TO_SEVENTYNINE = '60-79',
    EIGHTY_TO_NINETYNINE = '80-99',
}
