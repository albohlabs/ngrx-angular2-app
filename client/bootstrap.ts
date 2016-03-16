//main entry point
import {provide} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {provideStore} from '@ngrx/store';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';

import {users} from './src/users/reducers/users';
import {App} from './src/app';

bootstrap(App, [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    provide(LocationStrategy, { useClass: HashLocationStrategy }),
    provideStore({users})
])
.catch(err => console.error(err));
