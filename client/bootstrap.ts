//main entry point
import {provide} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {App} from './src/app'

/**
 * NOTE. the ngrx provideStore() is configured in app.ts as the devtools
 * instrumentStore() needs to called directly after it. It would normally
 * go in the bootstrap file.
 * https://github.com/ngrx/devtools
 */
bootstrap(App, [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    provide(LocationStrategy, { useClass: HashLocationStrategy })
])
.catch(err => console.error(err));
