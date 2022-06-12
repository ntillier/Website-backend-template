'use strict';

import http from 'http';
import url from 'url';

import serveStatic from './manager/lib/static.mjs';
import serveAPI from './manager/lib/api.mjs';
import servePage from './manager/lib/pages.mjs';

import ServerResponse from './manager/lib/extends.mjs';


http.createServer({
  ServerResponse: ServerResponse
}, function(req, res) {
  const u = url.parse(req.url).pathname;
  if (u.startsWith('/static/')) {
    serveStatic(req, res, u);
  } else if (u.startsWith('/api/')) {
    serveAPI(req, res, u);
  } else {
    servePage(req, res, u);
  }
})
.listen(process.env.PORT || 3000);
