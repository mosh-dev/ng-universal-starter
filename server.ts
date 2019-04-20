import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import {renderModuleFactory} from '@angular/platform-server';
import {enableProdMode} from '@angular/core';
import {join} from 'path';
import {readFileSync} from 'fs';
import {provideModuleMap} from '@nguniversal/module-map-ngfactory-loader';
import * as express from 'express';

enableProdMode();

const app = express();
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');
const APP_FOLDER = 'ng-universal-starter';
const allowCookieFrom = ['localhost:4000'];

/**
 * NOTE :: leave this as require() since this file is built Dynamically from webpack
 */
const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require('./dist/server/main');
app
  .use(cookieParser())
  .engine('html', (_, options, callback) => {
    const req = options.req;
    renderModuleFactory(AppServerModuleNgFactory, {
      document: readFileSync(join(DIST_FOLDER, APP_FOLDER, 'index.html')).toString(),
      url: req.url,
      extraProviders: [
        provideModuleMap(LAZY_MODULE_MAP),
        {
          provide: 'COOKIES',
          useValue: allowCookieFrom.includes(req.headers.host) ? req.cookies : {}
        }
      ]
    }).then(html => callback(null, html));
  })
  .set('view engine', 'html')
  .set('views', join(DIST_FOLDER, APP_FOLDER))
  .get('*.*', express.static(join(DIST_FOLDER, APP_FOLDER)))
  .get('*', (req, res) => res.render(join(DIST_FOLDER, APP_FOLDER, 'index.html'), {req}))
  .listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
