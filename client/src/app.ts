//our root app component
import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';
import { UsersRoute } from './users/routes/UsersRoute';
import { API_PROVIDERS } from './users/services/api';
import {provideStore, usePreMiddleware, usePostMiddleware, Middleware} from "@ngrx/store";
import {Devtools, instrumentStore} from '@ngrx/devtools';
import {users} from './users/reducers/users';
// note the reducer name will be used as the state property name to store state relative to the reducer
// so state.users.entities or state.users.loading

// ngrx middleware logs the action
const actionLog : Middleware = action => {
    return action.do(val => {
        console.info('DISPATCHED ACTION: ', val)
    });
};
// ngrx middleware logs the state
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
      instrumentStore(), // devtools
      usePreMiddleware(actionLog), //middleware
      usePostMiddleware(stateLog),//middleware
      API_PROVIDERS
  ],
  directives: [ ROUTER_DIRECTIVES, Devtools ]
})
@RouteConfig([
  {
     path: '/',
     redirectTo: ['/Users', 'UsersList'] // same as writing '/Users/UsersList'
  },
  {
    path: '/users/...',
    component: UsersRoute,
    as: 'Users'
  }
])
export class App {

}
