import { State, Action, StateContext, Selector } from '@ngxs/store';
import { SetCountry, SetGender, SetAge, SetEducation, SetProfession, SetIncome, SetName } from '../actions/demographicData.action';
import { AgeScale, AgeRange20 } from '../share/enumerations/age.enum';
import { GenderScale, GenderBasic, GenderAdvanced } from '../share/enumerations/gender.enum';
import { CountryScale, DeuAutChe } from '../share/enumerations/country.enum';
import { EducationGerman, EducationScale, EducationAcademic } from '../share/enumerations/education.enum';
import { IncomeScale, IncomeThreeSteps } from '../share/enumerations/income.enum';
import { ProfessionScale, ProfessionBasic, ProfessionAdvanced } from '../share/enumerations/profession.enum';
import { ValueScaleMatchError } from '../errors/valueScaleMatch.error';
import { Age } from '../share/models/age.model';
import { Gender } from '../share/models/gender.model';
import { Country } from '../share/models/country.model';
import { Education } from '../share/models/education.model';
import { Income } from '../share/models/income.model';
import { Profession } from '../share/models/profession.model';
import { Name } from '../share/models/name.model';
import { NeoFfi, NeoFfiResult } from '../share/models/neo-ffi.model';
import { LikertFiveLevel, LikertThreeLevel, LikertScale } from '../share/enumerations/likert.enum';
import * as NeoFfiActions from '../actions/neoFfi.action';
import { Ocean } from '../share/enumerations/ocean.enum';
import { UndefinedScaleError } from '../errors/undefinedScale.error';
import { QuestionOutOfRangeError } from '../errors/questionOutOfRange.error';
import { UndefinedFactorError } from '../errors/undefinedFactor.error';
import { Demographic } from '../share/enumerations/demographic.enum';
import { Tests } from '../share/enumerations/tests.enum';
import * as ZmSmActions from '../actions/mpZm.action';
import { MpZm, MpZmResult } from '../share/models/mp-zm.model';
import { Zurich } from '../share/enumerations/zurich.enum';
import { SurveyComponent } from '../share/types/surveyComponent.type';
import { SetComponent, SetToken, SetUID, SetDemographic } from '../actions/survey.action';

export class SurveyStateModel {
    demographicData: {
        name: Name;
        age: Age;
        gender: Gender;
        country: Country;
        education: Education;
        income: Income;
        profession: Profession;
    };
    tests: {
        neo_ffi: NeoFfi;
        mp_zm: MpZm;
    };
    configuration: {
        components: SurveyComponent[],
        uid: String,
        token: String,
        demographic: SurveyComponent,
    };
    results: {
        neo_ffi: NeoFfiResult;
        mp_zm: MpZmResult;
    };
}

// TODO: Remove static configuration
@State<SurveyStateModel>({
    name: 'surveyState',
    defaults: {
        demographicData: null,
        tests: null,
        configuration: {
            components: [
                Tests.NEO_FFI,
                Tests.ZM_SM,
            ],
            uid: 'G5gmbZL53jPgAfTnT3Z1Nq',
            token: 'CMiLQAiz5WXW4HzzMUVb',
            demographic: Demographic.GOOGLE,
        },
        results: null,
    }
})

export class SurveyState {

    @Action(SetDemographic)
    SetDemographic(ctx: StateContext<SurveyStateModel>, action: {demographic: SurveyComponent}) {
        const state = ctx.getState();
        ctx.patchState({
            configuration: {
                ...state.configuration,
                'demographic': action.demographic
            },
        });
    }

    @Action(SetComponent)
    SetLayout(ctx: StateContext<SurveyStateModel>, action: {layout: SurveyComponent[]}) {
        const state = ctx.getState();
        ctx.patchState({
            configuration: {
                ...state.configuration,
                'components': action.layout
            },
        });
    }

    @Action(SetToken)
    SetToken(ctx: StateContext<SurveyStateModel>, action: {token: String}) {
        const state = ctx.getState();
        ctx.patchState({
            configuration: {
                ...state.configuration,
                'token': action.token
            },
        });
    }

    @Action(SetUID)
    SetUID(ctx: StateContext<SurveyStateModel>, action: {uid: String}) {
        const state = ctx.getState();
        ctx.patchState({
            configuration: {
                ...state.configuration,
                'uid': action.uid
            },
        });
    }

    @Action(ZmSmActions.SetScale)
    SetScale(ctx: StateContext<SurveyStateModel>, action: {scale: LikertScale }) {
        if (!Object.values(LikertScale).includes(<LikertScale>action.scale)) {
            throw new Error('Undefined scale');
        }
        const state = ctx.getState();
        ctx.patchState({
            tests: {
                ...state.tests,
                mp_zm: {
                    ...state.tests.mp_zm,
                    'scale': action.scale,
                }
            }
        });
    }

    @Action(ZmSmActions.SetAnswer)
    // tslint:disable-next-line: max-line-length
    SetAnswer(ctx: StateContext<SurveyStateModel>, action: { value: LikertThreeLevel | LikertFiveLevel, question: Number, factor: Zurich }) {
        const state = ctx.getState();

        switch (state.tests.mp_zm.scale) {
            case LikertScale.LIKERT_THREE_LEVEL:
                if (!Object.values(LikertThreeLevel).includes(<LikertThreeLevel>action.value)) {
                    throw new ValueScaleMatchError();
                }
                break;

            case LikertScale.LIKERT_FIVE_LEVEL:
                if (!Object.values(LikertFiveLevel).includes(<LikertFiveLevel>action.value)) {
                    throw new ValueScaleMatchError();
                }
                break;

            default:
                throw new UndefinedScaleError();
        }
        if (action.question > 5 || action.question < 0) {
            throw new QuestionOutOfRangeError();
        }
        switch (action.factor) {
            case Zurich.SAFETY:
                ctx.patchState({
                    tests: {
                        ...state.tests,
                        mp_zm: {
                            ...state.tests.mp_zm,
                            safety: {
                                ...state.tests.mp_zm.safety,
                                ['question_' + action.question.toString()]: action.value,
                            },
                        }
                    }
                });
                break;
            case Zurich.INITIATIVE:
                ctx.patchState({
                    tests: {
                        ...state.tests,
                        mp_zm: {
                            ...state.tests.mp_zm,
                            initiative: {
                                ...state.tests.mp_zm.initiative,
                                ['question_' + action.question.toString()]: action.value,
                            },
                        }
                    }
                });
                break;
            case Zurich.MIGHT:
                ctx.patchState({
                    tests: {
                        ...state.tests,
                        mp_zm: {
                            ...state.tests.mp_zm,
                            might: {
                                ...state.tests.mp_zm.might,
                                ['question_' + action.question.toString()]: action.value,
                            },
                        }
                    }
                });
                break;
            case Zurich.REPUTE:
                ctx.patchState({
                    tests: {
                        ...state.tests,
                        mp_zm: {
                            ...state.tests.mp_zm,
                            repute: {
                                ...state.tests.mp_zm.repute,
                                ['question_' + action.question.toString()]: action.value,
                            },
                        }
                    }
                });
                break;
            case Zurich.ACCOMPLISHMENT:
                    ctx.patchState({
                        tests: {
                            ...state.tests,
                            mp_zm: {
                                ...state.tests.mp_zm,
                                accomplishment: {
                                    ...state.tests.mp_zm.accomplishment,
                                    ['question_' + action.question.toString()]: action.value,
                                },
                            }
                        }
                    });
                    break;

            default:
                throw new UndefinedFactorError();
        }
    }

    @Action(ZmSmActions.SetResult)
    SetZmSmResult(ctx: StateContext<SurveyStateModel>, action: { result: MpZmResult }) {
        const state = ctx.getState();
        ctx.patchState({
            results: {
                ...state.results,
                mp_zm: action.result,
            }
        });
    }

    @Action(NeoFfiActions.SetScale)
    SetNeoFfiScale(ctx: StateContext<SurveyStateModel>, action: {scale: LikertScale}) {
        if (!Object.values(LikertScale).includes(<LikertScale>action.scale)) {
            throw new Error('Undefined scale');
        }
        const state = ctx.getState();
        ctx.patchState({
            tests: {
                ...state.tests,
                neo_ffi: {
                    ...state.tests.neo_ffi,
                    'scale': action.scale,
                }
            }
        });
    }

    @Action(NeoFfiActions.SetAnswer)
    // tslint:disable-next-line: max-line-length
    SetNeoFfiAnswer(ctx: StateContext<SurveyStateModel>, action: { value: LikertThreeLevel | LikertFiveLevel, question: Number, factor: Ocean}) {
        const state = ctx.getState();

        switch (state.tests.neo_ffi.scale) {
            case LikertScale.LIKERT_THREE_LEVEL:
                if (!Object.values(LikertThreeLevel).includes(<LikertThreeLevel>action.value)) {
                    throw new ValueScaleMatchError();
                }
                break;

            case LikertScale.LIKERT_FIVE_LEVEL:
                if (!Object.values(LikertFiveLevel).includes(<LikertFiveLevel>action.value)) {
                    throw new ValueScaleMatchError();
                }
                break;

            default:
                throw new UndefinedScaleError();
        }
        if (action.question > 11 || action.question < 0) {
            throw new QuestionOutOfRangeError();
        }
        switch (action.factor) {
            case Ocean.AGREEABLENESS:
                ctx.patchState({
                    tests: {
                        ...state.tests,
                        neo_ffi: {
                            ...state.tests.neo_ffi,
                            agreeableness: {
                                ...state.tests.neo_ffi.agreeableness,
                                ['question_' + action.question.toString()]: action.value,
                            },
                        }
                    }
                });
                break;
            case Ocean.CONSCIENTIOUSNESS:
                ctx.patchState({
                    tests: {
                        ...state.tests,
                        neo_ffi: {
                            ...state.tests.neo_ffi,
                            conscientiousness: {
                                ...state.tests.neo_ffi.conscientiousness,
                                ['question_' + action.question.toString()]: action.value,
                            },
                        }
                    }
                });
                break;
            case Ocean.EXTRAVERSION:
                ctx.patchState({
                    tests: {
                        ...state.tests,
                        neo_ffi: {
                            ...state.tests.neo_ffi,
                            extraversion: {
                                ...state.tests.neo_ffi.extraversion,
                                ['question_' + action.question.toString()]: action.value,
                            },
                        }
                    }
                });
                break;
            case Ocean.NEUROTICISM:
                ctx.patchState({
                    tests: {
                        ...state.tests,
                        neo_ffi: {
                            ...state.tests.neo_ffi,
                            neuroticism: {
                                ...state.tests.neo_ffi.neuroticism,
                                ['question_' + action.question.toString()]: action.value,
                            },
                        }
                    }
                });
                break;
            case Ocean.OPENNESS:
                    ctx.patchState({
                        tests: {
                            ...state.tests,
                            neo_ffi: {
                                ...state.tests.neo_ffi,
                                openness: {
                                    ...state.tests.neo_ffi.openness,
                                    ['question_' + action.question.toString()]: action.value,
                                },
                            }
                        }
                    });
                    break;

            default:
                throw new UndefinedFactorError();
        }
    }

    @Action(NeoFfiActions.SetResult)
    SetNeoFfiResult(ctx: StateContext<SurveyStateModel>, action: { result: NeoFfiResult }) {
        const state = ctx.getState();
        ctx.patchState({
            results: {
                ...state.results,
                neo_ffi: action.result,
            }
        });
    }

    @Action(SetName)
    SetName(ctx: StateContext<SurveyStateModel>, action: Name) {
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
    SetAge(ctx: StateContext<SurveyStateModel>, action: Age) {
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
    SetGender(ctx: StateContext<SurveyStateModel>, action: Gender, ) {
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
    setCountry(ctx: StateContext<SurveyStateModel>, action: Country, ) {
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
    setEducation(ctx: StateContext<SurveyStateModel>, action: Education, ) {
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
    setIncome(ctx: StateContext<SurveyStateModel>, action: Income, ) {
        switch (action.scale) {
            case IncomeScale.BASIC:
                if (isNaN(action.value.valueOf()) || action.value.valueOf() < 0) {
                    throw new ValueScaleMatchError();
                }
                break;

            case IncomeScale.RANGE_10000:
                if (isNaN(action.value.valueOf()) || action.value.valueOf() % 10000 !== 0 || action.value.valueOf() < 0) {
                    throw new ValueScaleMatchError();
                }
                break;
            case IncomeScale.THREE_STEPS:
                if (!Object.values(IncomeThreeSteps).includes(<IncomeThreeSteps><unknown>action.value)) {
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
    setProfession(ctx: StateContext<SurveyStateModel>, action: Profession, ) {
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
