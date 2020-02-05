import { MpZm, MpZmResult } from "../../src/app/share/models/mp-zm.model";
import { likertToNumeric } from "./helper";


export function calculateMpZm(data: MpZm): MpZmResult{
    const accomplishment = likertToNumeric(data.accomplishment.question_0, data.scale)
                         + likertToNumeric(data.accomplishment.question_1, data.scale)
                         + likertToNumeric(data.accomplishment.question_2, data.scale)
                         + likertToNumeric(data.accomplishment.question_3, data.scale)
                         + likertToNumeric(data.accomplishment.question_4, data.scale)
                         + likertToNumeric(data.accomplishment.question_5, data.scale)

    const initiative = likertToNumeric(data.initiative.question_0, data.scale)
                     + likertToNumeric(data.initiative.question_1, data.scale)
                     + likertToNumeric(data.initiative.question_2, data.scale)
                     + likertToNumeric(data.initiative.question_3, data.scale)
                     + likertToNumeric(data.initiative.question_4, data.scale)
                     + likertToNumeric(data.initiative.question_5, data.scale)

    const might = likertToNumeric(data.might.question_0, data.scale)
                + likertToNumeric(data.might.question_1, data.scale)
                + likertToNumeric(data.might.question_2, data.scale)
                + likertToNumeric(data.might.question_3, data.scale)
                + likertToNumeric(data.might.question_4, data.scale)
                + likertToNumeric(data.might.question_5, data.scale)

    const repute = likertToNumeric(data.repute.question_0, data.scale)
                 + likertToNumeric(data.repute.question_1, data.scale)
                 + likertToNumeric(data.repute.question_2, data.scale)
                 + likertToNumeric(data.repute.question_3, data.scale)
                 + likertToNumeric(data.repute.question_4, data.scale)
                 + likertToNumeric(data.repute.question_5, data.scale)

    const safety = likertToNumeric(data.safety.question_0, data.scale)
                 + likertToNumeric(data.safety.question_1, data.scale)
                 + likertToNumeric(data.safety.question_2, data.scale)
                 + likertToNumeric(data.safety.question_3, data.scale)
                 + likertToNumeric(data.safety.question_4, data.scale)
                 + likertToNumeric(data.safety.question_5, data.scale)

    // tslint:disable-next-line: prefer-const
    let  mpZmResult = {} as MpZmResult;
    mpZmResult.accomplishment = accomplishment;
    mpZmResult.initiative = initiative;
    mpZmResult.might = might;
    mpZmResult.repute = repute;
    mpZmResult.safety = safety;
    mpZmResult.scale = data.scale;

    return mpZmResult;
                                
}
