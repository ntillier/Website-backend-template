export default function (path, url) {
  if (!path || !url) {
    throw new Error('You need to specify two paths.')
  }
  if (!path.includes('[')) {
    return path === url;
  } else if (path.split(/\//g).length !== url.split(/\//g).length) {
     return false;
  } else {
    return new RegExp('^' + path.replace(/\[.+\]/g, '[^\\/]+') + '$').test(url);
  }
}