import { ResponseStream } from '../manager/file.mjs';

export default function (req, res) {
  ResponseStream(`/data/docs.json`, res);
}