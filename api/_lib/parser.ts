import { IncomingMessage } from 'http';
import { parse } from 'url';
import { ParsedRequest } from './types';

export function parseRequest(req: IncomingMessage) {
  console.log('HTTP ' + req.url);
  const { pathname, query } = parse(req.url || '/', true);
  const { fontSize, tags, author, authorProfile, url } = query || {};

  if (Array.isArray(fontSize)) {
    throw new Error('Expected a single fontSize');
  }

  const arr = (pathname || '/').slice(1).split('.');
  let extension = '';
  let text = '';
  if (arr.length === 0) {
    text = '';
  } else if (arr.length === 1) {
    text = arr[0];
  } else {
    extension = arr.pop() as string;
    text = arr.join('.');
  }

  const parsedRequest: ParsedRequest = {
    fileType: extension === 'jpeg' ? extension : 'png',
    text: decodeURIComponent(text),
    fontSize: fontSize || '96px',
    tags: getArray(tags),
    url: getArray(url),
    author: getArray(author),
    authorProfile: getArray(authorProfile),
  };
  return parsedRequest;
}

function getArray(stringOrArray: string[] | string | undefined): string[] {
  if (typeof stringOrArray === 'undefined') {
    return [];
  } else if (Array.isArray(stringOrArray)) {
    return stringOrArray;
  } else {
    return [stringOrArray];
  }
}
