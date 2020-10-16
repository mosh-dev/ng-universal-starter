import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { Express } from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';
import { environment } from './src/environments/environment';

let requestReceived = 0;
let concurrent = 0;

// The Express app is exported so that it can be used by serverless Functions.
export function app(): Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/ng-universal-starter/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    ++requestReceived;
    ++concurrent;
    res.render(indexHtml, {req, providers: [{provide: APP_BASE_HREF, useValue: req.baseUrl}]});
  });

  return server;
}

function run(): void {
  const port = process.env.PORT || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

function printUsage(): void {
  console.log('\n');
  const {heapTotal, heapUsed} = process.memoryUsage();
  [
    `Request Total       : ${requestReceived}`,
    `Request Per Second  : ${Math.trunc(concurrent)}`,
    `Heap Total          : ${Math.round((heapTotal) / 1024 / 1024 * 100) / 100} MB`,
    `Heap Used           : ${Math.round((heapUsed) / 1024 / 1024 * 100) / 100} MB`
  ].forEach(item => console.log(item));
  concurrent = 0;
}

if (environment.enableStatistics) {
  setInterval(printUsage, 1000);
}

export * from './src/main.server';
