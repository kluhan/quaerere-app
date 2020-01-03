import { LikertScale, LikertThreeLevel, LikertFiveLevel } from '../enumerations/likert.enum';

export class MpZm {
    scale: LikertScale;
    safety: Safety;
    initiative: Initiative;
    might: Might;
    repute: Repute;
    accomplishment: Accomplishment;
}

export class Safety {
    question_0:  LikertThreeLevel | LikertFiveLevel;
    question_1:  LikertThreeLevel | LikertFiveLevel;
    question_2:  LikertThreeLevel | LikertFiveLevel;
    question_3:  LikertThreeLevel | LikertFiveLevel;
    question_4:  LikertThreeLevel | LikertFiveLevel;
    question_5:  LikertThreeLevel | LikertFiveLevel;
}

export class Initiative {
    question_0:  LikertThreeLevel | LikertFiveLevel;
    question_1:  LikertThreeLevel | LikertFiveLevel;
    question_2:  LikertThreeLevel | LikertFiveLevel;
    question_3:  LikertThreeLevel | LikertFiveLevel;
    question_4:  LikertThreeLevel | LikertFiveLevel;
    question_5:  LikertThreeLevel | LikertFiveLevel;
}

export class Might {
    question_0:  LikertThreeLevel | LikertFiveLevel;
    question_1:  LikertThreeLevel | LikertFiveLevel;
    question_2:  LikertThreeLevel | LikertFiveLevel;
    question_3:  LikertThreeLevel | LikertFiveLevel;
    question_4:  LikertThreeLevel | LikertFiveLevel;
    question_5:  LikertThreeLevel | LikertFiveLevel;
}

export class Repute {
    question_0:  LikertThreeLevel | LikertFiveLevel;
    question_1:  LikertThreeLevel | LikertFiveLevel;
    question_2:  LikertThreeLevel | LikertFiveLevel;
    question_3:  LikertThreeLevel | LikertFiveLevel;
    question_4:  LikertThreeLevel | LikertFiveLevel;
    question_5:  LikertThreeLevel | LikertFiveLevel;
}

export class Accomplishment {
    question_0:  LikertThreeLevel | LikertFiveLevel;
    question_1:  LikertThreeLevel | LikertFiveLevel;
    question_2:  LikertThreeLevel | LikertFiveLevel;
    question_3:  LikertThreeLevel | LikertFiveLevel;
    question_4:  LikertThreeLevel | LikertFiveLevel;
    question_5:  LikertThreeLevel | LikertFiveLevel;
}