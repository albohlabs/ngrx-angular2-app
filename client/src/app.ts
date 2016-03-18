//our root app component
import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';
import { UsersRoute } from './users/routes/UsersRoute';
import { API_PROVIDERS } from './users/services/api';
import {provideStore, usePreMiddleware, usePostMiddleware, Middleware} from "@ngrx/store";
import {Devtools, instrumentStore} from '@ngrx/devtools';
import {users} from './users/reducers/users';

const actionLog : Middleware = action => {
    return action.do(val => {
        console.warn('DISPATCHED ACTION: ', val)
    });
};

const stateLog : Middleware = state => {
    return state.do(state => {
        console.info('NEW STATE: ',state, state.users.toJS())
    });
};

@Component({
  selector: 'app',
  template: require('./app.html'),
  providers: [
      provideStore({users}),
      instrumentStore(),
      usePreMiddleware(actionLog),
      usePostMiddleware(stateLog),
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
