'use strict';


import { ResponseStream } from '../file.mjs';
import config from '../server.config.js';
import CreateZip from './zip.mjs';
import match from './match.mjs';
import Tree from './tree.mjs';

const home = process.cwd() + '/pages';


const tree = Tree('/pages');

if (config.gzipCompression) {
  CreateZip(tree);
}

function iterate(obj) {
  const arr = [];
  
  for (var i of obj.children) {
    if (i.type === 'file') {
      arr.push(
        i.path.substring(
          home.length, i.path.search(/\..*?$/)
        )
      );
    } else if (i.type === 'directory') {
      arr.push(...iterate(i));
    }
  }
  
  return arr;
}

const pages = iterate(tree).sort((a, b) => {
  if (/\[/.test(a) && !/\[/.test(b)) {
    return 1;
  } else {
    return -1;
  }
});

console.log('\x1b[33m The pages will now be served! \x1b[0m');

function send(req, res, path) {
  if (
    req.headers['accept-encoding'].includes('gzip') &&
    config.gzipCompression
  ) {
    res.setEncoding('gzip');
    return `/manager/zip/pages${path}${config.pagesExtension}.gz`;
  } else {
    return `/pages${path}${config.pagesExtension}`;
  }
}

export default function(req, res, path) {
  let find = false;
  
  for (var i of pages) {
    if (match(i === '/index' ? '/' : i, path)) {
      find = true;
      ResponseStream(send(req, res, i), res);
      break;
    }
  }
  
  if (!find) {
    if (pages.includes('/404')) {
      ResponseStream(send(req, res, '/404'), res);
    } else {
      res
        .writeHead(200)
        .end('<h1>Error</h1>');
    }
  }
}