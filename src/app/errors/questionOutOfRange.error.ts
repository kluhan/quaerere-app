export class QuestionOutOfRangeError extends Error {
    constructor() {
      super('Question index is out of range');
      this.name = this.constructor.name;
    }
}
