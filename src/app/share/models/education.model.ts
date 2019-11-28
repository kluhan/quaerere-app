import { EducationScale, EducationAcademic, EducationGerman } from '../enumerations/education.enum';

export class Education {
    scale: EducationScale;
    value: EducationAcademic | EducationGerman;
}
