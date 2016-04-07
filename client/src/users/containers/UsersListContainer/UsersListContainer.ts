import { Component, ChangeDetectionStrategy } from 'angular2/core';
import { Users } from '../../models/users';
import { UsersList } from '../../components/UsersList/UsersList';

@Component({
  selector: 'users-list-container',
  directives: [ UsersList ],
  // template: require('./UsersListContainer.html'),
    template: `
    <users-list
      [users]="users.users$ | async"
      [loading]="users.loading$ | async"
      [adding]="users.adding$ | async"
      (addUser)="users.addUser($event)"
      (deleteUser)="users.deleteUser($event)"
      (reloadUsers)="users.reloadUsers()">
    </users-list>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListContainer {
  // User service is declared in UserRoute.ts
  constructor(public users: Users) {
    users.loadUsers();
  }
}
