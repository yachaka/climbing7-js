
import mergeWith from 'lodash.mergewith';

export default (object, ...sources) => mergeWith(object, ...sources, (a, b) => {
  if (Array.isArray(a) && Array.isArray(b)) {
    return a.concat(b);
  }
});
