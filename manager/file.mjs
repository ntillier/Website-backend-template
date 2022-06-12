'use strict';

/*========
This module simplify some some existing function of the fs module.

IsFile: return a Promise
========*/

import getType from './lib/type.mjs';
import config from './server.config.js';
import { 
  existsSync, 
  readFile, 
  writeFile,
  lstatSync,
  createReadStream,
  readdirSync
} from 'fs';


const home = process.cwd();

export function IsFile (path = '/') {
  return new Promise((resolve, reject) => {
    if (existsSync(home + path)) {
      if (lstatSync(home + path).isFile()) {
        resolve(home + path);
      } else {
        reject({
          err: 'The path does not refer to a file.'
        })
      }
    } else {
      reject({
        err: 'The path doesn\'t exists.'
      })
    }
  })
}

export function Read (path = '/') {
  return new Promise((resolve, reject) => {
    IsFile(home + path)
      .then(async (p) => {
        resolve(await readFile(p));
      })
      .catch(err => {
        reject(err)
      });
  })
}

export function Write (path = '/', content = '') {
  return new Promise((resolve, reject) => {
    IsFile(home + path)
      .then((p) => {
        writeFile(p, content)
        .then(() => {
          resolve(content);
        });
      })
      .catch(err => {
        reject(err);
      })
  })
}

export function ResponseStream (path, res) {
  if (!path || !res) {
    return {
      err: 'We need a path, an url and a Response object.'
    }
  }
  IsFile(path)
    .then((p) => {
      const stream = createReadStream(p);
      stream.on('error', function() {
          res.writeHead(200);
          res.end();
      });
      res.setHeader('Content-type', getType(/(?<=\.).*?(?=\.gz$|$)/.exec(path)));
      res.writeHead(200);
      stream.pipe(res);
    })
    .catch(err => {
      return {
        err: err
      }
    });
}

export function ReadDirSync(path) {
  return readdirSync(home + path);
}

export function IsFileSync(path) {
  if (existsSync(home + path)) {
    if (lstatSync(home + path).isFile()) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
