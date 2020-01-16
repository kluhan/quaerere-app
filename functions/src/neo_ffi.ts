import { NeoFfi, NeoFfiResult } from "../../src/app/share/models/neo-ffi.model";
import { likertToNumeric, negate } from "./helper";


export function calculateNeoFfi(data: NeoFfi): NeoFfiResult{

    const agreeableness = (likertToNumeric(data.agreeableness.question_0, data.scale)
                        + negate(likertToNumeric(data.agreeableness.question_1, data.scale), data.scale)
                        + negate(likertToNumeric(data.agreeableness.question_2, data.scale), data.scale)
                        + likertToNumeric(data.agreeableness.question_3, data.scale)
                        + negate(likertToNumeric(data.agreeableness.question_4, data.scale), data.scale)
                        + negate(likertToNumeric(data.agreeableness.question_5, data.scale), data.scale)
                        + likertToNumeric(data.agreeableness.question_6, data.scale)
                        + negate(likertToNumeric(data.agreeableness.question_7, data.scale), data.scale)
                        + negate(likertToNumeric(data.agreeableness.question_8, data.scale), data.scale)
                        + likertToNumeric(data.agreeableness.question_9, data.scale)
                        + negate(likertToNumeric(data.agreeableness.question_10, data.scale), data.scale)
                        + negate(likertToNumeric(data.agreeableness.question_11, data.scale), data.scale))/12

    const conscientiousness = (likertToNumeric(data.conscientiousness.question_0, data.scale)
                            + likertToNumeric(data.conscientiousness.question_1, data.scale)
                            + negate(likertToNumeric(data.conscientiousness.question_2, data.scale), data.scale)
                            + likertToNumeric(data.conscientiousness.question_3, data.scale)
                            + likertToNumeric(data.conscientiousness.question_4, data.scale)
                            + negate(likertToNumeric(data.conscientiousness.question_5, data.scale), data.scale)
                            + likertToNumeric(data.conscientiousness.question_6, data.scale)
                            + likertToNumeric(data.conscientiousness.question_7, data.scale)
                            + negate(likertToNumeric(data.conscientiousness.question_8, data.scale), data.scale)
                            + likertToNumeric(data.conscientiousness.question_9, data.scale)
                            + negate(likertToNumeric(data.conscientiousness.question_10, data.scale), data.scale)
                            + likertToNumeric(data.conscientiousness.question_11, data.scale))/12
                                    
    const extraversion  = (likertToNumeric(data.extraversion.question_0, data.scale)
                        + likertToNumeric(data.extraversion.question_1, data.scale)
                        + negate(likertToNumeric(data.extraversion.question_2, data.scale), data.scale)
                        + likertToNumeric(data.extraversion.question_3, data.scale)
                        + likertToNumeric(data.extraversion.question_4, data.scale)
                        + negate(likertToNumeric(data.extraversion.question_5, data.scale), data.scale)
                        + likertToNumeric(data.extraversion.question_6, data.scale)
                        + likertToNumeric(data.extraversion.question_7, data.scale)
                        + negate(likertToNumeric(data.extraversion.question_8, data.scale), data.scale)
                        + likertToNumeric(data.extraversion.question_9, data.scale)
                        + likertToNumeric(data.extraversion.question_10, data.scale)
                        + negate(likertToNumeric(data.extraversion.question_11, data.scale), data.scale))/12
                                    
    const neuroticism  = (negate(likertToNumeric(data.neuroticism.question_0, data.scale), data.scale)
                        + likertToNumeric(data.neuroticism.question_1, data.scale)
                        + likertToNumeric(data.neuroticism.question_2, data.scale)
                        + negate(likertToNumeric(data.neuroticism.question_3, data.scale), data.scale)
                        + likertToNumeric(data.neuroticism.question_4, data.scale)
                        + likertToNumeric(data.neuroticism.question_5, data.scale)
                        + negate(likertToNumeric(data.neuroticism.question_6, data.scale), data.scale)
                        + likertToNumeric(data.neuroticism.question_7, data.scale)
                        + likertToNumeric(data.neuroticism.question_8, data.scale)
                        + negate(likertToNumeric(data.neuroticism.question_9, data.scale), data.scale)
                        + likertToNumeric(data.neuroticism.question_10, data.scale)
                        + likertToNumeric(data.neuroticism.question_11, data.scale))/12
        
    const openness = (negate(likertToNumeric(data.openness.question_0, data.scale), data.scale)
                    + negate(likertToNumeric(data.openness.question_1, data.scale), data.scale)
                    + likertToNumeric(data.openness.question_2, data.scale)
                    + negate(likertToNumeric(data.openness.question_3, data.scale), data.scale)
                    + negate(likertToNumeric(data.openness.question_4, data.scale), data.scale)
                    + likertToNumeric(data.openness.question_5, data.scale)
                    + negate(likertToNumeric(data.openness.question_6, data.scale), data.scale)
                    + negate(likertToNumeric(data.openness.question_7, data.scale), data.scale)
                    + likertToNumeric(data.openness.question_8, data.scale)
                    + negate(likertToNumeric(data.openness.question_9, data.scale), data.scale)
                    + likertToNumeric(data.openness.question_10, data.scale)
                    + likertToNumeric(data.openness.question_11, data.scale))/12

    // tslint:disable-next-line: prefer-const
    const  neoFfiResult = {} as NeoFfiResult;
    neoFfiResult.agreeableness = agreeableness;
    neoFfiResult.conscientiousness = conscientiousness;
    neoFfiResult.extraversion = extraversion;
    neoFfiResult.neuroticism = neuroticism;
    neoFfiResult.openness = openness;
    neoFfiResult.scale = data.scale;

    return neoFfiResult;
                                
}
