# The API directory?

The `api` directory will contain the endpoints and the code to execute when there is a request to one of the existing api endpoints.

For example, if you have a file called `user.js`, the api endpoint will be `/api/user`. If you have a file called `world.js` in a folder called `hello`, the api endpoint will be `/api/hello/world`


> **What does it means?**
> It means when a request is received with a url corresponding to the api endpoint, the exported function of this file will be executed!

### Example
You have a file called `test.js` in the `api` directory, and its content is:

```js
export default function(req, res) {
  res
    .status(200)
    .send('Hello world!');
}
```

If you open a new tab, and go to the following url `https://localhost/api/test`, you have a wonderful `Hello world!` that appears

> **The `[]` notation:** You can choose to have a single js file to handle many endpoints. To do that, you can create a folder called `user` and create in it a file called `[what-you-want].js`. If you write the same code that before in it, its exported function will be executed for all the api endpoints matching this path `/api/user/<username>`
___
For this project, I have created a little module create a read stream to send the content of a file quickly, with the good `content-type` header. To use it, you have to import it:
```
import { ResponseStream } from '../file.mjs';
```

and to use it, just do the same as follows:
```
export default function (req, res) {
  ResponseStream('/path/to/file', res);
}
```
> **Warning:** to specify the path of the file to send, you have to write the path of the file from the root.
> For example: `/data/docs.json`.


 ___
> **Next parts:**
> * [Improve teh API](/docs/improve-api)
> * [The pages manager](/docs/pages)
> * [The static manager](/docs/static)