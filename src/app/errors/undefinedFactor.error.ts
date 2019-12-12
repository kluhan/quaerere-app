export class UndefinedFactorError extends Error {
    constructor() {
      super('Undefined Factor was used');
      this.name = this.constructor.name;
    }
}
