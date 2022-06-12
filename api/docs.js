import { ResponseStream, IsFileSync } from '../manager/file.mjs';
import url from 'url';

export default function (req, res) {
  const name = url.parse(req.url, true).query.name;
  if (IsFileSync(`/data/docs/${name}.md`)) {
    ResponseStream(`/data/docs/${name}.md`, res);
  } else {
    res
      .status(404)
      .json({
        error: 'The ressource doesn\'t exists.'
      });
  }
}