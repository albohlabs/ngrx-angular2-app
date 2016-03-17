//our root app component
import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';
import { UsersRoute } from './users/routes/UsersRoute';
import { API_PROVIDERS } from './users/services/api';
import {provideStore} from '@ngrx/store';
import {Devtools, instrumentStore} from '@ngrx/devtools';
import {users} from './users/reducers/users';

@Component({
  selector: 'app',
  template: require('./app.html'),
  providers: [
      provideStore({users}),
      instrumentStore(),
      API_PROVIDERS
  ],
  directives: [ ROUTER_DIRECTIVES, Devtools ]
})
@RouteConfig([
  {
     path: '/',
     redirectTo: ['/Users', 'UsersList']
  },
  {
    path: '/users/...',
    component: UsersRoute,
    as: 'Users'
  }
])
export class App {

}
