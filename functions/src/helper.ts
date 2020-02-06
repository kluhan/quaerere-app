import { LikertFiveLevel, LikertThreeLevel, LikertScale } from "../../src/app/share/enumerations/likert.enum";
import { Demographic } from "../../src/app/share/enumerations/demographic.enum";
import { Tests } from "../../src/app/share/enumerations/tests.enum"


export class Survey {
    demographic: Demographic;
    layout: Array<Tests>;
    token: Array<String>;
    name: String;
}

export class Token {
    type: TokenType;
    limit: Number;
    count: Number;
}

export enum TokenType{
    FREE = "free",
    VOLUME = "volume",
}
// TODO: Write custom Error
export function likertToNumeric(value: LikertFiveLevel | LikertThreeLevel, scale: LikertScale ) {
    switch (scale) {
        case LikertScale.LIKERT_FIVE_LEVEL:
            switch (value) {
                case LikertFiveLevel.STRONG_AGREE:
                    return 4
            
                case LikertFiveLevel.AGREE:
                    return 3
        
                case LikertFiveLevel.NEUTRAL:
                    return 2
        
                case LikertFiveLevel.DISAGREE:
                    return 1
        
                case LikertFiveLevel.STRONG_DISAGREE:
                    return 0
                default:
                    throw Error("Value isn't LikertThreeLevel");
            }
    
        case LikertScale.LIKERT_THREE_LEVEL:
            switch (value) {
                case LikertFiveLevel.AGREE:
                    return 2
        
                case LikertFiveLevel.NEUTRAL:
                    return 1
        
                case LikertFiveLevel.DISAGREE:
                    return 0
                default:
                    throw Error("Value isn't LikertThreeLevel"); 
            }
    }
    
}

// TODO: Write custom Error
export function negate(value: number, scale: LikertScale ) {
    switch (scale) {
        case LikertScale.LIKERT_THREE_LEVEL:
            return 2-value;
    
        case LikertScale.LIKERT_FIVE_LEVEL:
            return 4-value;
        
        default:
            throw Error("Scale isn't a LikertScale");
    }
}
