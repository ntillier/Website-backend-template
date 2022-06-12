# Ready-to-use backend
### A fast, scalable, easy-to-use and ready-to-use NodeJS backend, without any framework
___

You probably know the replit template for simple websites. If this is the case, you can easily **go to the next step** and **implement an API** to **improve your websites** with **Nodejs**, a Javascript framawork

### Parts
_**Note:** The first three parts are in this file, the others are in the folder called `tuto`._
 * Presentation of the project
 * How does it works
 * How to start a new project from it
 * [The API directory](https://website-backend-template.nathanti.repl.co/docs/api)
 * [The manager directory](https://website-backend-template.nathanti.repl.co/docs/manager)
 * [The pages directory](https://website-backend-template.nathanti.repl.co/docs/pages)
 * [The static directory](https://website-backend-template.nathanti.repl.co/docs/static)
 * More

___

## Presentation of the project

This project is divided into 5 folders (I guess you had already seen it 😉), called `api`, `data`, `manager`, `pages`, `static`. 

Its architecture is as follows:
```
|_ index.js
|_ api 
    |_ endpoint 1
    |_ endpoint 2
|_ data
    |_ a file with some data
|_ manager
    |_ lib
        |_ some stuff
    |_ file.mjs
    |_ server.config.js
|_ pages
    |_ index.html
    |_ 404.html
|_ static
    |_ some static contents
```
In the first directory intitled `api`, there are the api endpoints, with the code to execute.

In the second directory, called `data`, you can store some datas (this is optionnal).

In the third directory, there are the main files of the project, that will manage the API, the static files, the pages...

In the fourth directory, there will be the webpages of your project.

Finally, in the last directory, you can store all the static ressources, such as the css or javascript files, the images...

___

> #### Info
> All the files' type are `module`. It means instead of using `require()` and `exports` to require modules, you will have to use `import from` and `export`.
>
> ```js
> // import a module, use it instead of: const moduleName = require('/path/to/module')
> import moduleName from '/path/to/module'
>
> // export a default function, use it instead of: module.exports
> export default function(txt) {
>   console.log(txt);
> }
>
> // export a function with a name, use it instead of: exports.Log
> export function Log(txt) {
>   console.log(txt);
> }
> ```
