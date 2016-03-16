import { Component } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';
import { UsersDetailContainer } from '../containers/UsersDetailContainer/UsersDetailContainer';

@Component({
  selector: 'UsersDetailRoute',
  directives: [ ROUTER_DIRECTIVES, UsersDetailContainer ],
  template: `
    <h2>Detail of a user <a [routerLink]="['/Users', 'UsersList']">back to list</a></h2>
    <users-detail-container></users-detail-container>
  `
})
export class UsersDetailRoute {

}
