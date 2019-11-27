export class DemographicProfession {
    scale: ProfessionScale;
    value: ProfessionBasic | ProfessionAdvanced;
}

export enum ProfessionBasic {
    GARDENER = 'gardener',
    BUILDER = 'builder',
    STUDENT = 'student',
}

export enum ProfessionAdvanced {
    CHEF = 'chef',
    JOURNALIST = 'journalist',
    DOCTOR = 'doctor',
    FIREFIGHTER = 'firefighter',
}

export enum ProfessionScale {
    BASIC,
    ADVANCED,
}