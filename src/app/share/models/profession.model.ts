import { ProfessionScale, ProfessionBasic, ProfessionAdvanced } from '../enumerations/profession.enum';

export class Profession {
    scale: ProfessionScale;
    value: ProfessionBasic | ProfessionAdvanced;
}
