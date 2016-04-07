import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from 'angular2/core';

import {
  FormBuilder,
  ControlGroup,
  Validators
} from 'angular2/common';

@Component({
  selector: 'users-detail',
  // template: require('./UsersDetail.html'),
    template : `
        <h5 *ngIf="loading">Loading User...</h5>
        <div *ngIf="!loading">
          <p>
            ID: {{ user.id }} - {{ user.name }} - {{ user.email }}
          </p>
          <form [ngFormModel]="userForm" (submit)="patchUser.emit(userForm.value)">
            <input type="hidden" ngControl="id" [ngModel]="user.id">
            <p>name <input [ngModel]="user.name" ngControl="name"></p>
            <p>email <input [ngModel]="user.email" ngControl="email"></p>
            <button [disabled]="! userForm.valid">save</button>
          </form>
        </div>
    `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersDetail {
  @Input() user;
  @Input() loading;
  @Output() patchUser = new EventEmitter(false);

  userForm: ControlGroup;

  constructor(public builder: FormBuilder) {}

  ngOnInit() {
    this.userForm = this.builder.group({
      id: [''],
      name: ['', Validators.required],
      email: ['', Validators.required]
    });
  }
}
