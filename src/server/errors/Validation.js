
import BadRequest from './BadRequest';

export default class ErrorValidation extends BadRequest {
  constructor(validationErrors) {
    super('There have been validation errors');
    this.validationErrors = validationErrors;
  }

  toJSON() {
    const json = super.toJSON();
    json.errors = this.validationErrors;
    return json;
  }
}
