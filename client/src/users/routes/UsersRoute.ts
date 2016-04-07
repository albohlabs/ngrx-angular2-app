import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';

import { UsersListRoute } from './UsersListRoute';
import { UsersDetailRoute } from './UsersDetailRoute';
import { Users } from '../models/users';

@Component({
  selector: 'UsersRoute',
  template: `<router-outlet></router-outlet>`,
  directives: [ ROUTER_DIRECTIVES ],
  providers: [ Users ] // make service available to child views
})
@RouteConfig([
  {
    path: '/list',
    component: UsersListRoute,
    as: 'UsersList'
  },
  {
    path: '/detail/:id',
    component: UsersDetailRoute,
    as: 'UsersDetail'
  }
])
export class UsersRoute {

}
