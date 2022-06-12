"use strict";

/**

This module will build the api endpoints.

**/

/* 
We import:
 * the module to check if two urls match
 * the module to convert a directory tree to a javascript object
*/
import match from './match.mjs';
import tree from './tree.mjs';

// the home is the root directory
const home = process.cwd();

// we retrieve the Object of the api's directory
const filteredTree = tree('/api');

// if the directory doesn't exists, we throw an error
if (!filteredTree) {
  throw new Error('You need to have a directory called \'api\'');
}

/*
The most important of the module, the fucntion that will convert the directory tree into an array of endpoints, with their path and function to execute
*/
async function iterate(obj) {
    let arr = [];
    for (const i of obj.children) {
      if (i.type === 'file') {
        const m = await import(i.path);
        arr.push({
          path: i.path.substring(home.length, i.path.search(/\..*?$/)),
          exec: m.default
        });
      } else if (i.type === 'directory') {
        const a = await iterate(i);
        arr.push(...a);
      }
    }
    return Promise.resolve(arr);
}

let endpoints = [];
async function writeEndpoints () {
  endpoints = await iterate(filteredTree);
  console.log('\x1b[33m API builded successfully! \x1b[0m');
}

writeEndpoints();


export default function(req, res, path) {
  for (var i of endpoints) {
    if (match(i.path, path)) {
      i.exec(req, res);
      break;
    }
  }
}