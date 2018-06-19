// @flow
import {observable, computed, useStrict} from "mobx";
import * as _ from "lodash";
import type {Contacts} from "../Model";
import {Firebase} from "../components";

export default class ContactsStore {

    @observable _loading: boolean = true;
    @observable _contacts: Contacts = [];

    @computed get contacts(): Contacts { return this._contacts; }
    set contacts(contacts: Contacts) { this._contacts = contacts; }

    @computed get loading(): boolean { return this._loading; }
    set loading(loading: boolean) { this._loading = loading; }


    constructor() {
        Firebase.getUsers()
            .then((users) => {
              delete users[Firebase.auth.currentUser.uid]
              this.contacts = users;
            }).finally(() => this.loading = false);
    }

}
