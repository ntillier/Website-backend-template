'use strict';

import fs from 'fs';
import { createGzip } from 'zlib';

const home = process.cwd();

fs.rmSync(`${home}/manager/zip`, 
  { 
    recursive: true, 
    force: true 
});
fs.mkdirSync(`${home}/manager/zip`);

export function getZipPath (p) {
  return `${home}/manager/zip${p.substring(home.length)}`;
}

function addZip (obj) {
  fs.mkdirSync(getZipPath(obj.path));
  for (var i of obj.children) {
    if (i.type === 'file') {
      const stream = fs.createReadStream(i.path);
      stream
        .pipe(createGzip())
        .pipe(fs.createWriteStream(
          getZipPath(i.path) + '.gz')
        );
    } else if (i.type === 'directory') {
      addZip(i);
    }
  }
  return;
}

export default addZip;
