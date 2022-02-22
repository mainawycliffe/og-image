import { readFileSync } from 'fs';
import { sanitizeHtml } from './sanitizer';
import { ParsedRequest } from './types';
const twemoji = require('twemoji');
const twOptions = { folder: 'svg', ext: '.svg' };
const emojify = (text: string) => twemoji.parse(text, twOptions);

const rglr = readFileSync(`${__dirname}/../_fonts/Inter-Regular.woff2`).toString('base64');
const bold = readFileSync(`${__dirname}/../_fonts/Inter-Bold.woff2`).toString('base64');
const mono = readFileSync(`${__dirname}/../_fonts/Vera-Mono.woff2`).toString('base64');

function getCss(fontSize: string) {
  let background = '#e0e0fd';
  let foreground = '#000033';
  let foreground2 = '#4D4DFF';

  return `
    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${rglr}) format('woff2');
    }

    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: bold;
        src: url(data:font/woff2;charset=utf-8;base64,${bold}) format('woff2');
    }

    @font-face {
        font-family: 'Vera';
        font-style: normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${mono})  format("woff2");
      }

    body {
        background: ${background};
        background-size: 100px 100px;
        height: 100vh;
        width: 100%;
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
    }

    body > div {
        width: 100%;
    }

    code {
        color: #D400FF;
        font-family: 'Vera';
        white-space: pre-wrap;
        letter-spacing: -5px;
    }

    code:before, code:after {
        content: '\`';
    }

    .tags-row {
        display: flex;
        width: 100%;
        font-size: 3rem;
        flex-direction: row;
        color: ${foreground};
        align-items: center;
        justify-content: center;
    }

    svg {
        height: 2.5rem;
        width: 2.5rem;
        color: ${foreground};
    }

    .logo-row {
        display: flex;
        width: 100%;
        flex-direction: row;
        color: ${foreground};
        align-items: center;
        justify-content: center;
        text-decoration: italic;
    }

    .article-metadata {
        display: flex;
        color: ${foreground};
        flex-direction: column;
    }

    .article-metadata > .author {
        font-size: 4rem;
        color: ${foreground2};
    }

    .logo-wrapper {
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;
        justify-items: center;
        padding: 0.5rem;
    }

    .logo {
        margin: 0 75px;
        border: 5px solid ${foreground2};
        border-radius: 0.4rem;
    }

    .plus {
        color: #BBB;
        font-family: Times New Roman, Verdana;
        font-size: 100px;
    }

    .spacer {
        margin: 150px;
    }

    .emoji {
        height: 1em;
        width: 1em;
        margin: 0 .05em 0 .1em;
        vertical-align: -0.1em;
    }
    
    .heading {
        font-family: 'Inter', sans-serif;
        font-size: ${sanitizeHtml(fontSize)};
        font-style: normal;
        font-weight: bold;
        color: ${foreground};
        line-height: 1.8;
        width: 100%;
    }`;
}

export function getHtml(parsedReq: ParsedRequest) {
  const { text, fontSize, author, tags } = parsedReq;
  return `<!DOCTYPE html>
    <html>
      <meta charset="utf-8" />
      <title>Generated Image</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <style>
        ${getCss(fontSize)}
      </style>
      <body>
        <div>
          <div class="spacer"></div>
          <div class="heading">${emojify(sanitizeHtml(text))}</div>

          <div class="tags-row">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
              <path
                d="M472.8 168.4C525.1 221.4 525.1 306.6 472.8 359.6L360.8 472.9C351.5 482.3 336.3 482.4 326.9 473.1C317.4 463.8 317.4 448.6 326.7 439.1L438.6 325.9C472.5 291.6 472.5 236.4 438.6 202.1L310.9 72.87C301.5 63.44 301.6 48.25 311.1 38.93C320.5 29.61 335.7 29.7 344.1 39.13L472.8 168.4zM.0003 229.5V80C.0003 53.49 21.49 32 48 32H197.5C214.5 32 230.7 38.74 242.7 50.75L410.7 218.7C435.7 243.7 435.7 284.3 410.7 309.3L277.3 442.7C252.3 467.7 211.7 467.7 186.7 442.7L18.75 274.7C6.743 262.7 0 246.5 0 229.5L.0003 229.5zM112 112C94.33 112 80 126.3 80 144C80 161.7 94.33 176 112 176C129.7 176 144 161.7 144 144C144 126.3 129.7 112 112 112z"
              />
            </svg>
            ${tags.join(', ')}
          </div>
          <div class="spacer"></div>
          <div class="spacer"></div>
          <div class="logo-row">
            <div class="logo-wrapper">
              ${getImage('https://mainawycliffe.dev/profile_photo.jpeg', '100px', '100px')}
            </div>
            <div class="article-metadata">
              <div class="author">by ${sanitizeHtml(author?.[0] ?? 'Maina Wycliffe')}</div>
            </div>
          </div>
          <div class="spacer"></div>
        </div>
      </body>
    </html>`;
}

function getImage(src: string, width = 'auto', height = '225') {
  return `<img
        class="logo"
        alt="Generated Image"
        src="${sanitizeHtml(src)}"
        width="${sanitizeHtml(width)}"
        height="${sanitizeHtml(height)}"
    />`;
}
