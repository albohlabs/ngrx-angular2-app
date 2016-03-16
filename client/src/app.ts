//our root app component
import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';
import { UsersRoute } from './users/routes/UsersRoute';
import { API_PROVIDERS } from './users/services/api';

@Component({
  selector: 'app',
  template: require('./app.html'),
  providers: [ API_PROVIDERS ],
  directives: [ ROUTER_DIRECTIVES ]
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
