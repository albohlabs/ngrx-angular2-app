import { Component } from 'angular2/core';
import { UsersListContainer } from '../containers/UsersListContainer/UsersListContainer';

@Component({
  selector: 'UsersListRoute',
  template: `
    <h5>List of users</h5>
    <users-list-container></users-list-container>
    <h6>(There is a delay of 2 seconds to all network requetst)</h6>
  `,
  directives: [ UsersListContainer ]
})
export class UsersListRoute {
  constructor() {

  }
}
