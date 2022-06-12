# More things about the project

> **Note:** This list is exhaustive. Some of the points can be explained quickly. The goal is to give you some ideas to improve your program.

**Summary:**
* Change the server.config.js file
* Set the pages manually
* Improve the API
* Use `[]`

# Change the server.config.js file

In the file called `server.config.js` in the `manager` directory, you can see that this module export an object with two properties: `gzipCompression` and `pagesExtension`. 

**Let's see what does it changes:**
* gzipCompression
  * If its value is set to `true`, all the files in the `pages` directory will be compressed using gzip. It can help tu use less bandwidth. Its default value is `false`.
* pagesExtension
  * the extension of the pages in the `pages` folder. Its default value is `.html`.

# Set the pages manually
You may need to restrict access to one of your web pages, or to set manually the pages that will be send. To do this, you [need to understand how the module sending the pages works](/docs/how-project-works). 
Once you've understood it, you can follow the next steps:
* Remove all code from line 13 to line 35
* In the array called `pages`, write all the path of the files you want to be sended

**Example:**
```
const pages = [
  '/404',
  '/index',
  '/docs/[item]'
];
```

# Improve the API 
For now, the program list all the files in the `api` folder, create paths from them and require/import them.

A faster way to do that would be the following:
```js
import endpoint1 from '/path/to/endpoint1';
import endpoint2 from '/path/to/endpoint2';

const endpoints = [
  {
    path: '/api/endpoint1',
    exec: endpoint1
  },
  {
    path: '/api/endpoint2',
    exec: endpoint2
  }
];
```
# Use []

You can use the `[]` notation to create dynamic route segments. 
For example, a file in the `pages` directory with this path: `/user/[user].html`, will be send for all the requests that follows this scheme `/user/<username>`. 

You can also use this to create something like semi route segments (I don't really know how to call it):

**Example:**
A file with this path: `/user-[name].html`, will be send for the pathname of this request: `/user-nathanTi`, (`/user-<username>`)
