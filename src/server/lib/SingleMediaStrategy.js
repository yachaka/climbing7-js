
import identity from 'identity-function';

module.exports = (key) => (block, newFile) => {
  return block.$relatedQuery('medias')
    .column('id')
    .where('key', key)
    .then((medias) => {
      const ids = medias.map(m => m.id);
      if (ids.length) {
        return Promise.all([
          block.$relatedQuery('medias').unrelate(ids).then(identity),
          ...medias.map(m => m.$query().delete().then(identity)),
        ]);
      }
    })
    .then(() => {
      return block.$relatedQuery('medias')
        .insert([{
          key,
          filename: newFile.filename,
        }]);
    });
};