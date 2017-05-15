
import HTTPError from './HTTPError';

export default class Error404 extends HTTPError {
  constructor(message) {
    super(404, message);
  }
}
