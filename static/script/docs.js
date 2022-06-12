/*================
An anonymous self-invoking function
================*/
(function() {
  /*========
  A function to make request. Return a Promise.
  ========*/
  function makeRequest(type, url) {
    return new Promise((resolve, reject) => {
      var req = new XMLHttpRequest();
      req.onreadystatechange = function() {
        if (req.readyState === 4) {
          if (req.status === 200) {
            resolve(req.response);
          } else {
            reject(req.response);
          }
        }
      }
      req.open(type, url, true);
      req.send();
    });
  }
  // we make a request to the api
  makeRequest('GET', '/api/docs?name=' + window.location.pathname.split('/')[2])
  .then(txt => {
    // we create a converter to conver the content of the md file
    var converter = new showdown.Converter();

    // we convert the content of the md file into html
    document.getElementById('article').innerHTML = converter.makeHtml(txt);

    // for all the code part, the language is javascript
    document.querySelectorAll('pre code')
    .forEach(i => {
      i.classList.add('language-javascript')
    })

    // we highlight all the code part
    hljs.highlightAll();
  })
  .catch(err => {
    // if the document doesn't exists, we tell it to the user
    const elem = document.createElement('section');
    elem.textContent = 'The document doesn\'t exists.';
    document.getElementById('article').appendChild(elem);
  });
})();