import { Injectable } from 'angular2/core';
import { Action, Reducer, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/subject/BehaviorSubject';
import { Schema } from 'normalizr';
import { List, Map, Record, fromJS } from 'immutable';
import { ApiService } from '../services/api';

export const LOADING_USERS = 'LOADING_USERS';
export const LOADED_USERS = 'LOADED_USERS';
export const LOADING_USER = 'LOADING_USER';
export const LOADED_USER = 'LOADED_USER';
export const ADDING_USER = 'ADDING_USER';
export const ADDED_USER = 'ADDED_USER';
export const DELETING_USER = 'DELETING_USER';
export const DELETED_USER = 'DELETED_USER';
export const PATCHED_USER = 'PATCHED_USER';

const PATCH_USER = 'PATCH_USER';
const DELETE_USER = 'DELETE_USER';
const ADD_USER = 'ADD_USER';
const LOAD_USER = 'LOAD_USER';
const LOAD_USERS = 'LOAD_USERS';

// Schema('users') maps to the users in normalizedData.entities.users
// Schema('cats') would result in normalizedData.entities.cats
export const userSchema = new Schema('users');

// Record: a record is like an object with default values for some keys.
// When instantiating a record, the values for the keys defined in the record can be given
// during instantiation. In absence of a value, the default value of the record is used.
export const UserRecord = Record({
    id: null,
    name: null,
    email: null,
    deleting: false
});

export interface IUser {
    id: string;
    name: string;
    email: string;
}

// this resents the the ngrx store. It has a matching reducer i.e.
// in reducer we see initialState: IUsers = fromJS({result...});
export interface IUsers extends Map {
    result: List<Number>;
    entities: { users: Map<Number, IUser>};
    adding: boolean;
    loading: boolean;
}

@Injectable()
export class Users {
    loading$:Observable<Map<String, Boolean>>;
    adding$:Observable<Map<String, Boolean>>;
    users$:Observable<Map<String, any>>;

    private actions$ = new BehaviorSubject<Action>({type: null, payload: null});

    constructor(private _store:Store<any>, api:ApiService) {
        const usersStore$ = this._store.select<IUsers>('users');

        this.adding$ = usersStore$.map(data => {
            return data.get('adding');
        });

        this.loading$ = usersStore$.map(data => {
            return data.get('loading');
        });

        // stream of arrays which contain user Records
        this.users$ = usersStore$.map(data => {
            return data.get('result').reduce((acc, userId) => {
                // getIn converts array to path i.e. return data at entities/users/3
                acc.push(data.getIn(['entities', 'users', userId]));
                return acc;
            }, []);
        });

        // mergeMap() takes two arguments, an observable to merge and function.
        // the function is invoked with the value from the original observable
        // and the value from the merged observable. In the code below the
        // 'action' comes from the original observable and the payload comes
        // from the merged observable (i.e. api.createUser)
        // the value returned from the function is passed to its subscribers.

        // 'action' is object created in this.actions$.next({type: ADD_USER, payload: user});
        // 'payload' is the response from api.createUser(action.payload) http request
        // the return object {type: ADDED_USER, payload} is the value returned from the observable
        let adds = this.actions$
            .filter(action => action.type === ADD_USER)
            .do(() => _store.dispatch({type: ADDING_USER}))
            .mergeMap(
                action => api.createUser(action.payload),
                (action, payload:IUser) => ({type: ADDED_USER, payload}));

        let deletes = this.actions$
            .filter(action => action.type === DELETE_USER && !action.payload.deleting)
            .do(action => _store.dispatch({type: DELETING_USER, payload: action.payload}))
            .mergeMap(
                action => api.deleteUser(action.payload.id),
                (action, payload:IUser) => ({type: DELETED_USER, payload: action.payload.id}));

        let loads = this.actions$
            .filter(action => action.type === LOAD_USERS)
            .do(() => _store.dispatch({type: LOADING_USERS}))
            .mergeMap(
                action => api.loadUsers(),
                (action, payload:IUser[]) => ({type: LOADED_USERS, payload}));

        let loadsOne = this.actions$
            .filter(action => action.type === LOAD_USER)
            .do(() => _store.dispatch({type: LOADING_USER}))
            .mergeMap(
                action => api.loadUser(action.payload),
                (action, payload:IUser) => ({type: LOADED_USER, payload: payload}));

        let patchesOne = this.actions$
            .filter(action => action.type === PATCH_USER)
            .mergeMap(
                action => api.updateUser(action.payload),
                (action, payload:IUser) => ({type: PATCHED_USER, payload}));

        Observable
            .merge(adds, deletes, loads, loadsOne, patchesOne)
            .do(action => console.log(11, 'action', action))
            .subscribe((action:Action) => _store.dispatch(action));
    }


    addUser(user) {
        this.actions$.next({type: ADD_USER, payload: user});
    }

    deleteUser(user) {
        this.actions$.next({type: DELETE_USER, payload: user});
    }

    loadUsers() {
        this.actions$.next({type: LOAD_USERS});
    }

    loadUser(id) {
        id = parseInt(id, 10);
        this.actions$.next({type: LOAD_USER, payload: id});
        return this.users$
            .map(data => data.find(item => item.id === id) || {});
    }

    patchUser(user) {
        this.actions$.next({type: PATCH_USER, payload: user});
    }

    reloadUsers() {
        this._store.dispatch({type: LOADED_USERS, payload: []});
        this.loadUsers();
    }
}
