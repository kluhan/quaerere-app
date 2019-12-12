export class ValueScaleMatchError extends Error {
    constructor() {
      super('Value and Scale didn\'t match');
      this.name = this.constructor.name;
    }
}
