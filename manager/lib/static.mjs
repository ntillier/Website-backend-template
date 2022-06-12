"use strict";

import { ResponseStream } from '../file.mjs';

console.log('\x1b[33m Static files will now be served! \x1b[0m');

export default function(req, res, path) {
  ResponseStream(path, res);
}