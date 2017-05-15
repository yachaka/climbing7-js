
import HTTPError from './HTTPError';

export default class Error500 extends HTTPError {
  constructor(message) {
    super(500, message);
  }
}
