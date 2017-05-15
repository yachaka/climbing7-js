
const imageMimeTypes = [
  'image/jpeg',
  'image/gif',
  'image/png',
  'image/svg+xml',
];

export default (mimeType) => imageMimeTypes.indexOf(mimeType) !== -1;