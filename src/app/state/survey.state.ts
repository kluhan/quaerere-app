import { State, Action, StateContext } from '@ngxs/store';
import { SetCountry, SetGender, SetAge, SetEducation, SetProfession, SetIncome, SetName } from '../actions/demographicData.action';
import { DemographicAge, AgeScale, AgeRange20 } from '../share/enumerations/age.enum';
import { DemographicGender, GenderScale, GenderBasic, GenderAdvanced } from '../share/enumerations/gender.enum';
import { DemographicCountry, CountryScale, DeuAutChe } from '../share/enumerations/country.enum';
import { DemographicEducation, EducationGerman, EducationScale, EducationAcademic } from '../share/enumerations/education.enum';
import { DemographicIncome, IncomeScale } from '../share/enumerations/income.enum';
import { DemographicProfession, ProfessionScale, ProfessionBasic, ProfessionAdvanced } from '../share/enumerations/profession.enum';
import { ValueScaleMatchError } from '../errors/scale-value.error';

export class SurveyStateModel {
    demographicData: {
        name: {first: String, last: String};
        age: DemographicAge;
        gender: DemographicGender;
        country: DemographicCountry;
        education: DemographicEducation;
        income: DemographicIncome;
        profession: DemographicProfession;
    };
}

@State<SurveyStateModel>({
    name: 'SurveyState',
    defaults: {
        demographicData: {
            name: {
                first: undefined,
                last: undefined,
            },
            age: {
                scale: undefined,
                value: undefined,
            },
            gender: {
                scale: undefined,
                value: undefined,
            },
            country: {
                scale: undefined,
                value: undefined,
            },
            education: {
                scale: undefined,
                value: undefined,
            },
            income: {
                scale: undefined,
                value: undefined,
            },
            profession: {
                scale: undefined,
                value: undefined,
            }
        },
    }
})

export class SurveyState {

    @Action(SetName)
    SetName(ctx: StateContext<SurveyStateModel>, action: {first: String, last: String}) {
        const state = ctx.getState();
        ctx.patchState({
            demographicData: {
                ...state.demographicData,
                name: {
                    'first': action.first,
                    'last': action.last,
                }
            }
        });
    }

    @Action(SetAge)
    SetAge(ctx: StateContext<SurveyStateModel>, action: DemographicAge) {
        switch (action.scale) {
            case AgeScale.BASIC:
                if (isNaN(action.value.valueOf())) {
                    throw new ValueScaleMatchError();
                }
                break;

            case AgeScale.RANGE_20:
                if (!Object.values(AgeRange20).includes(<AgeRange20><unknown>action.value)) {
                    throw new ValueScaleMatchError();
                }
                break;

            default:
                throw new Error('Undefined scale');
        }
        const state = ctx.getState();
        ctx.patchState({
            demographicData: {
                ...state.demographicData,
                age: {
                    'value': action.value,
                    'scale': action.scale,
                }
            }
        });
    }

    @Action(SetGender)
    SetGender(ctx: StateContext<SurveyStateModel>, action: DemographicGender, ) {
        switch (action.scale) {
            case GenderScale.BASIC:
                if (!Object.values(GenderBasic).includes(<GenderBasic>action.value)) {
                    throw new ValueScaleMatchError();
                }
                break;

            case GenderScale.ADVANCED:
                if (!Object.values(GenderAdvanced).includes(<GenderAdvanced>action.value)) {
                    throw new ValueScaleMatchError();
                }
                break;

            default:
                throw new Error('Undefined scale');
        }
        const state = ctx.getState();
        ctx.patchState({
            demographicData: {
                ...state.demographicData,
                gender: {
                    'value': action.value,
                    'scale': action.scale,
                },
            }
        });
    }

    @Action(SetCountry)
    setCountry(ctx: StateContext<SurveyStateModel>, action: DemographicCountry, ) {
        switch (action.scale) {
            case CountryScale.DEU_AUT_CHE:
                if (!Object.values(DeuAutChe).includes(<DeuAutChe>action.value)) {
                    throw new ValueScaleMatchError();
                }
                break;

            default:
                throw new Error('Undefined scale');
        }
        const state = ctx.getState();
        ctx.patchState({
            demographicData: {
                ...state.demographicData,
                country: {
                    'value': action.value,
                    'scale': action.scale,
                },
            }
        });
    }

    @Action(SetEducation)
    setEducation(ctx: StateContext<SurveyStateModel>, action: DemographicEducation, ) {
        switch (action.scale) {
            case EducationScale.GERMAN:
                if (!Object.values(EducationGerman).includes(<EducationGerman>action.value)) {
                    throw new ValueScaleMatchError();
                }
                break;

            case EducationScale.ACADEMIC:
                if (!Object.values(EducationAcademic).includes(<EducationAcademic>action.value)) {
                    throw new ValueScaleMatchError();
                }
                break;

            default:
                throw new Error('Undefined scale');
        }
        const state = ctx.getState();
        ctx.patchState({
            demographicData: {
                ...state.demographicData,
                education: {
                    'value': action.value,
                    'scale': action.scale,
                },
            }
        });
    }

    @Action(SetIncome)
    setIncome(ctx: StateContext<SurveyStateModel>, action: DemographicIncome, ) {
        switch (action.scale) {
            case IncomeScale.BASIC:
                if (isNaN(action.value.valueOf())) {
                    throw new ValueScaleMatchError();
                }
                break;

            case IncomeScale.RANGE_500:
                if (isNaN(action.value.valueOf()) || action.value.valueOf() % 500 !== 0) {
                    throw new ValueScaleMatchError();
                }
                break;
            case IncomeScale.RANGE_1000:
                if (isNaN(action.value.valueOf()) || action.value.valueOf() % 1000 !== 0) {
                    throw new ValueScaleMatchError();
                }
                break;

            default:
                throw new Error('Undefined scale');
        }
        const state = ctx.getState();
        ctx.patchState({
            demographicData: {
                ...state.demographicData,
                income: {
                    'value': action.value,
                    'scale': action.scale,
                },
            }
        });
    }

    @Action(SetProfession)
    setProfession(ctx: StateContext<SurveyStateModel>, action: DemographicProfession, ) {
        switch (action.scale) {
            case ProfessionScale.BASIC:
                if (!Object.values(ProfessionBasic).includes(<ProfessionBasic>action.value)) {
                    throw new ValueScaleMatchError();
                }
                break;

            case ProfessionScale.ADVANCED:
                if (!Object.values(ProfessionAdvanced).includes(<ProfessionAdvanced>action.value)) {
                    throw new ValueScaleMatchError();
                }
                break;

            default:
                throw new Error('Undefined scale');
        }
        const state = ctx.getState();
        ctx.patchState({
            demographicData: {
                ...state.demographicData,
                profession: {
                    'value': action.value,
                    'scale': action.scale,
                },
            }
        });
    }

}
