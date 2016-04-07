import {Component, ChangeDetectionStrategy} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {Observable} from 'rxjs/Observable';
import {Users, IUser} from '../../models/users';
import {UsersDetail} from '../../components/UsersDetail/UsersDetail';

@Component({
    selector: 'users-detail-container',
    directives: [UsersDetail],
    // template: require('./UsersDetailContainer.html'),
    template : `
        <users-detail
          [user]="user$ | async"
          [loading]="users.loading$ | async"
          (deleteUser)="users.deleteUser($event)"
          (patchUser)="users.patchUser($event)">
        </users-detail>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush

})
export class UsersDetailContainer {
    user$:Observable<IUser>;

    constructor(public users:Users, public params:RouteParams) {
    }

    ngOnInit() {
        this.user$ = this.users.loadUser(this.params.get('id'));
    }
}
