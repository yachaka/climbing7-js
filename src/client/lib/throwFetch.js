
module.exports = (url, options) => fetch(url, options)
  .then(res => {
    if (res.status >= 200 && res.status < 300) {
      return res;
    } else {
      const error = new Error(res.statusText);
      error.res = res;
      throw error;
    }
  });