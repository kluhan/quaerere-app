export class UndefinedScaleError extends Error {
    constructor() {
      super('Undefined Scale was used');
      this.name = this.constructor.name;
    }
}
