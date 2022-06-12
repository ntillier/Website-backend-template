"use-strict";

import types from './ext-types.mjs';

export default function(ext) {
  if (types[ext]) {
    return types[ext];
  } else {
    return 'application/octet-stream';
  }
}