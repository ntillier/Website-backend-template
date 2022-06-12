/*========
An anonymous self-invoking function.
========*/
(function () {
  /*========
  A function to make a requesr. It returns a Promise, and parse the JSON content
  ========*/
  function makeRequest(type, url) {
    return new Promise((resolve, reject) => {
      var req = new XMLHttpRequest();
      req.onreadystatechange = function() {
        if (req.readyState === 4) {
          if (req.status === 200) {
            resolve(JSON.parse(req.response));
          } else {
            reject(req.response);
          }
        }
      }
      req.open(type, url, true);
      req.send();
    });
  }
  // we select the article tag
  const article = document.getElementsByTagName('article')[0];

  // the function to create a card
  function createCard(obj) {
    const elem = document.createElement('DIV');
    elem.classList.add('card');
    elem.innerHTML = `<label>${obj.title}</label>${obj.description}`;
    elem.onclick = () => {
      window.open(obj.href, '_self');
    }
    article.appendChild(elem);
  }

  // we make a request and create a card for all the documents
  makeRequest('GET', '/api/all-docs')
  .then(dts => {
    dts.docs.forEach(createCard);
  })
  .catch(() => {
    // if there is an error, we inform the user
    createCard({
      title: 'Error',
      description: 'An error occured. Please reload the page',
      href: '/docs'
    });
  });
})();