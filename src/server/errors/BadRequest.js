
import HTTPError from './HTTPError';

export default class ErrorBadRequest extends HTTPError {
  constructor(message) {
    super(400, message);
  }
}
