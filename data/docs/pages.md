# The pages folder

The `pages` folder is the folder that will contain all the webpages.

> **Note:** You can change the pages extension by changing this file: `/manager/server.config.js`. The `pagesExtension` default property is `.html`

Let's create your firt page! Why not a page called `/about` to present yourself?
* Go to the `/pages` directory
* Create a file called `about.html` in it
* Write `<h1>About me</h1>` in this html file
* Stop and/or run the project.
* Go to https://localhost/about
* You will see, normally a big `About me` once the page is loaded!
___
Using this template, you can also serve a single html file for many paths:
* Create, in the `/pages` folder, a folder called `/user`.
* In this folder, create a file called `[user].html`
* Write, in this file, `<h1>User</h1>`
* Stop and/or run the project
* Go to https://localhost/user/a-username-you-can-choose
* I let you see what happend!

 ___
> **Next parts:**
> * [The static manager](/docs/static)