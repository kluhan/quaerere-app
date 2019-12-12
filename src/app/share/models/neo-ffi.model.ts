import { LikertScale, LikertThreeLevel, LikertFiveLevel } from '../enumerations/likert.enum';

export class NeoFfi {
    scale: LikertScale;
    openness: Openness;
    conscientiousness: Conscientiousness;
    extraversion: Extraversion;
    agreeableness: Agreeableness;
    neuroticism: Neuroticism;
}

export class Openness {
    question_0:  LikertThreeLevel | LikertFiveLevel;
    question_1:  LikertThreeLevel | LikertFiveLevel;
    question_2:  LikertThreeLevel | LikertFiveLevel;
    question_3:  LikertThreeLevel | LikertFiveLevel;
    question_4:  LikertThreeLevel | LikertFiveLevel;
    question_5:  LikertThreeLevel | LikertFiveLevel;
    question_6:  LikertThreeLevel | LikertFiveLevel;
    question_7:  LikertThreeLevel | LikertFiveLevel;
    question_8:  LikertThreeLevel | LikertFiveLevel;
    question_9:  LikertThreeLevel | LikertFiveLevel;
    question_10: LikertThreeLevel | LikertFiveLevel;
    question_11: LikertThreeLevel | LikertFiveLevel;
}

export class Conscientiousness {
    question_0:  LikertThreeLevel | LikertFiveLevel;
    question_1:  LikertThreeLevel | LikertFiveLevel;
    question_2:  LikertThreeLevel | LikertFiveLevel;
    question_3:  LikertThreeLevel | LikertFiveLevel;
    question_4:  LikertThreeLevel | LikertFiveLevel;
    question_5:  LikertThreeLevel | LikertFiveLevel;
    question_6:  LikertThreeLevel | LikertFiveLevel;
    question_7:  LikertThreeLevel | LikertFiveLevel;
    question_8:  LikertThreeLevel | LikertFiveLevel;
    question_9:  LikertThreeLevel | LikertFiveLevel;
    question_10: LikertThreeLevel | LikertFiveLevel;
    question_11: LikertThreeLevel | LikertFiveLevel;
}

export class Extraversion {
    question_0:  LikertThreeLevel | LikertFiveLevel;
    question_1:  LikertThreeLevel | LikertFiveLevel;
    question_2:  LikertThreeLevel | LikertFiveLevel;
    question_3:  LikertThreeLevel | LikertFiveLevel;
    question_4:  LikertThreeLevel | LikertFiveLevel;
    question_5:  LikertThreeLevel | LikertFiveLevel;
    question_6:  LikertThreeLevel | LikertFiveLevel;
    question_7:  LikertThreeLevel | LikertFiveLevel;
    question_8:  LikertThreeLevel | LikertFiveLevel;
    question_9:  LikertThreeLevel | LikertFiveLevel;
    question_10: LikertThreeLevel | LikertFiveLevel;
    question_11: LikertThreeLevel | LikertFiveLevel;
}

export class Agreeableness {
    question_0:  LikertThreeLevel | LikertFiveLevel;
    question_1:  LikertThreeLevel | LikertFiveLevel;
    question_2:  LikertThreeLevel | LikertFiveLevel;
    question_3:  LikertThreeLevel | LikertFiveLevel;
    question_4:  LikertThreeLevel | LikertFiveLevel;
    question_5:  LikertThreeLevel | LikertFiveLevel;
    question_6:  LikertThreeLevel | LikertFiveLevel;
    question_7:  LikertThreeLevel | LikertFiveLevel;
    question_8:  LikertThreeLevel | LikertFiveLevel;
    question_9:  LikertThreeLevel | LikertFiveLevel;
    question_10: LikertThreeLevel | LikertFiveLevel;
    question_11: LikertThreeLevel | LikertFiveLevel;
}

export class Neuroticism {
    question_0:  LikertThreeLevel | LikertFiveLevel;
    question_1:  LikertThreeLevel | LikertFiveLevel;
    question_2:  LikertThreeLevel | LikertFiveLevel;
    question_3:  LikertThreeLevel | LikertFiveLevel;
    question_4:  LikertThreeLevel | LikertFiveLevel;
    question_5:  LikertThreeLevel | LikertFiveLevel;
    question_6:  LikertThreeLevel | LikertFiveLevel;
    question_7:  LikertThreeLevel | LikertFiveLevel;
    question_8:  LikertThreeLevel | LikertFiveLevel;
    question_9:  LikertThreeLevel | LikertFiveLevel;
    question_10: LikertThreeLevel | LikertFiveLevel;
    question_11: LikertThreeLevel | LikertFiveLevel;
}