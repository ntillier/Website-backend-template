'use-strict';

import http from 'http';

export default class ServerResponse extends http.ServerResponse {
  json (body){
    const json = JSON.stringify(body);
    this.setHeader('Content-Type', 'application/json');
    return this.end(json);
  }
  send (text) {
    this.setHeader('Content-Type', 'text/plain');
    return this.end(text);
  }
  html(html) {
    this.setHeader('Content-Type', 'text/html');
    return this.end(html);
  }
  status(s) {
    this.statusCode = 301;
    return this;
  }
  setEncoding(e) {
    this.setHeader('Content-Encoding', 'gzip');
    return this;
  }
};