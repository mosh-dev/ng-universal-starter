import {ApplicationRef, enableProdMode, NgModuleRef} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import {createNewHosts} from '@angularclass/hmr';

interface HotModule extends NodeModule {
  hot: {
    accept();
    dispose(fn);
  };
}

if (environment.production) {
  enableProdMode();
}

if (environment.hmr) {
  if ((module as HotModule).hot) {
    const hmrBootstrap = ({hot}: HotModule, bootstrap: () => Promise<NgModuleRef<any>>) => {
      let ngModule: NgModuleRef<any>;
      hot.accept();
      bootstrap().then(mod => ngModule = mod);
      hot.dispose(() => {
        const appRef: ApplicationRef = ngModule.injector.get(ApplicationRef);
        const elements = appRef.components.map(c => c.location.nativeElement);
        const makeVisible = createNewHosts(elements);
        ngModule.destroy();
        makeVisible();
      });
    };

    hmrBootstrap(module as HotModule, () => platformBrowserDynamic().bootstrapModule(AppModule));
  } else {
    console.error('HMR is not enabled for webpack-dev-server!');
    console.log('Are you using the --hmr flag for ng serve?');
  }
} else {
  document.addEventListener('DOMContentLoaded', () => {
    platformBrowserDynamic().bootstrapModule(AppModule).catch(console.error);
  });
}
