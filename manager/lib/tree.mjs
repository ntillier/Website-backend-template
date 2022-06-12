"use-strict";

import { IsFileSync, ReadDirSync } from '../file.mjs';
import PATH from 'path';

const home = process.cwd();

function getInfos(path) {
  if (IsFileSync(path)) {
    return {
      type: 'file',
      path: home + path,
    }
  } else {
    return {
      type: 'directory',
      path: home + path,
      children: []
    }
  }
}

function read(path) {
  let obj = getInfos(path);
  if (obj.type !== 'directory') {
    return obj;
  }
  ReadDirSync(path)
  .forEach(i => {
    const infos = getInfos(`${path}/${i}`);
    if (infos.type === 'directory') {
      infos.children = read(`${path}/${i}`).children;
      obj.children.push(infos)
    } else {
      obj.children.push(infos)
    }
    
  });
  return obj;
}

export default read;