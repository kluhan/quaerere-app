import { AgeScale, AgeRange20 } from '../models/demographic/age.enum';
import { GenderAdvanced, GenderBasic, GenderScale } from '../models/demographic/gender.enum';
import { DeuAutChe, CountryScale } from '../models/demographic/country.enum';
import { EducationAcademic, EducationGerman, EducationScale } from '../models/demographic/education.enum';
import { IncomeScale } from '../models/demographic/income.enum';
import { ProfessionBasic, ProfessionAdvanced, ProfessionScale } from '../models/demographic/profession.enum';

export class SetName {
    static readonly type = '[DEMOGRAPHIC] Set Name';
    constructor(public first: String, public last: String, ) {}
}

export class SetAge {
    static readonly type = '[DEMOGRAPHIC] Set Age';
    constructor(public value: Number | AgeRange20, public scale: AgeScale, ) {}
}

export class SetGender {
    static readonly type = '[DEMOGRAPHIC] Set Gender';
    constructor(public value: GenderAdvanced | GenderBasic, public scale: GenderScale) {}
}

export class SetCountry {
    static readonly type = '[DEMOGRAPHIC] Set Country';
    constructor(public value: DeuAutChe, public scale: CountryScale) {}
}

export class SetEducation {
    static readonly type = '[DEMOGRAPHIC] Set Education';
    constructor(public value: EducationAcademic | EducationGerman, public scale: EducationScale) {}
}

export class SetIncome {
    static readonly type = '[DEMOGRAPHIC] Set Income';
    constructor(public value:  Number, public scale: IncomeScale) {}
}

export class SetProfession {
    static readonly type = '[DEMOGRAPHIC] Set Profession';
    constructor(public value: ProfessionBasic | ProfessionAdvanced, public scale: ProfessionScale) {}
}
