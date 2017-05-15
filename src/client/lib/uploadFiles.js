
export default (files) => {
  const data = new FormData();

  files.forEach(file => {
    data.append('file', file);
  });

  return fetch('/upload', {
    method: 'post',
    body: data,
  });
};
