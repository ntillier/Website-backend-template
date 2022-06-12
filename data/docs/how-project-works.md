# How does it works?

Before starting to create your next amazing website, you must understand how does this template works.
First of all, when the program starts to run, the `index.js` file is executed. In this file, the main modules are executed. 
___
**These main modules are:**
 * The API module `./manager/lib/api.mjs`, that will manage the API
 * The static module `./manager/lib/static.mjs`, that will serve the static content
 * The pages module `./manager/lib/pages.mjs`, that will retrieve the webpages to the user

> **Note:** all the modules mentioned here are present in the `/manager/lib` folder.

> **Note:** To access to an API endpoint, the request's pathname must start with `/api/`, and with `/static/` with the static files.

The `api.mjs` and `pages.mjs` modules work in the same way. When the project is run, they use a module called `tree.mjs` to create an object from a directory (`api` for the api, and `pages` for the pages)
___
For example, if you have a folder like this:
```
|_ doc1.js
|_ folder
    |_ doc2.js
    |_ doc3.js
```
The javascript object will be:
```
{
  path: '/path/to/main/folder',
  type: 'directory',
  children: [
    {
      path: '/path/to/doc1.js',
      type: 'file'
    },
    {
      path: '/path/to/folder',
      type: 'directory',
      children: [
        {
          path: '/path/to/doc2.js',
          type: 'file'
        },
        {
          path: '/path/to/doc3.js',
          type: 'file'
        }
      ]
    }
  ]
}
```

Then, there is another function, that transform this object into an array of paths:
```
const paths = [
  '/path/to/doc1.js',
  '/path/to/doc2.js',
  '/path/to/doc3.js'
];
```
There is a difference between the api and the pages here, it's that for the api file, the array of paths will be like that:
```
const paths = [
  {
    path: '/path/to/doc1.js',
    exec: /* the exported function of the file */
  },
  {
    path: '/path/to/doc2.js',
    exec: /* the exported function of the file */
  },
  {
    path: '/path/to/doc3.js',
    exec: /* the exported function of the file */
  }
];
```

Then, for each request, it will search for the first path that match the request's pathname.

> **Note:** The paths are then sorted, so that the paths without `[]` in it are before in the array.

## How does it works for the static directory?
It's a lot simpler for the static directory. For each request, if the path exists, it sends the file, otherwise it sends nothing 😄
___
> **Next parts:**
> * [The API manager](/docs/api)
> * [The pages manager](/docs/pages)
> * [The static manager](/docs/static)