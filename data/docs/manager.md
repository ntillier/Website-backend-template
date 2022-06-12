# The manager folder

The manager folder is the folder that contains all the modules run the server.

Here its tree:
```
|_ lib
    |_ api.mjs
    |_ ext-types.mjs
    |_ extends.mjs
    |_ match.mjs
    |_ pages.mjs
    |_ static.mjs
    |_ tree.mjs
    |_ type.mjs
    |_ zip.mjs
    
|_ zip
    |_ some files, depending on some options
    
|_ file.mjs
|_ server.config.js
```

## api.mjs
This file runs the api. It exports a default function, with three params: `req`, `res`, and a `path`. Depending on the path, it executes an api endpoint.
```
import serveAPI from '/api.mjs';

// execute an api endpoint (if it exists)
serveAPI(request, response, pathname)
```

## ext-types.mjs
This module exports an object, which allows to have the [MIME type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types) of a file extension. (the key is the file extension, and its value the MIME type)

```
import mimeTypes from '/ext-types.mjs';

// log 'application/json'
console.log(mimeTypes['json'])
```

## extends.mjs
This module exports a class, that extends the `Response` object of the http requests.

```
import http from 'http';
import ServerResponse from '/extends.mjs';

// extends the Response object of the server
const server = http.createServer({
  ServerResponse: ServerResponse
})

```

## match.mjs
This module exports a function, which allows us to know if a path matches a declared path.
```
import match from '/match.mjs';

// log 'true'
console.log(match('/api/user/[user]', '/api/user/nathanTi'));

// log 'false'
console.log(match('/api/user/[user]', '/api/user/nathanTi/me'));
```

## pages.mjs
It works as the `api.mjs` module, but it send an html page instead of executing an api endpoint.

```
import servePage from '/pages.mjs';

// send an html page
servePage(request, response, pathname);
```

## static.mjs
It works as the `api.mjs` module, but it send an html page instead of executing an api endpoint.

```
import serveStatic from '/static.mjs';

// send a static file
serveStatic(request, response, pathname);
```

## tree.mjs
It retrieve an Object from a folder.

```
import Tree from '/tree.mjs';

// retrieve an object (synchronisously)
const tree = Tree('/path');
```

## type.mjs
Retrieve the MIME type of a file extension
```
import type from '/type.mjs';

// log 'application/json'
console.log(type('json'));
```

## zip.mjs
Export a default function, and another function, called `getZipPath`

```
import createZip, { getZipPath } from '/zip.mjs';
import Tree from '/tree.mjs';

const tree = Tree('/path');

// create all the files compressed using gZip in a folder called '/manager/zip'
createZip(tree);

// log '/home/runner/website--backend-template/manager/zip/pages/index.html'
console.log( getZipPath('/pages/index.html.gz') )
```

## file.mjs
Export many functions:

```
import {
  IsFile,
  Read,
  Write,
  ResponseStream,
  ReadDirSync,
  IsFileSync
} from 'file.mjs';

IsFile('/path/to/file.txt')
.then(isfile => {
  // log 'true' or 'false'
  console.log(isfile);
});

Read('/path/to/file.txt')
.then(txt => {
  // log the content of the file
  console.log(txt);
});

Write('/path/to/file.txt', 'Hello world!')
.then(txt => {
  // log 'Hello world!'
  console.log(txt);
});

// send a file to an http request
ResponseStream('/path/to/file.txt', response);

ReadDirSync('/path')
.then(arr => {
  // log an array of paths
  console.log(arr);
});

// log 'true' or 'false'
console.log( IsFileSync('/path/file.txt') );
```

## server.config.js
Export an object with some variables

```
import config from '/server.config.js';

// log 'true' or 'false'
console.log(config.gzipCompression);

// log 'true' or 'false'
console.log(config.pagesExtension);
```

> **Next:**
> * [More things](/docs/more)