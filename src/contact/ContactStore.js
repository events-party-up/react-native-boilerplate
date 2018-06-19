// @flow
import {observable, computed, useStrict} from "mobx";
import * as _ from "lodash";
import type {User} from "../Model";
import {Firebase} from "../components";

export default class ContactStore {

    @observable _loading: boolean = true;
    @observable _contact: User;

    @computed get contact(): User { return this._contact; }
    set contact(contact: User) { this._contact = contact; }

    @computed get loading(): boolean { return this._loading; }
    set loading(loading: boolean) { this._loading = loading; }

    constructor(key:string) {
      Firebase.getUserById(key)
      .then((user) => {
        this.contact = user;
        Firebase.database.ref(user.role).once("value")
        .then((role) => {
          this.contact.role = role.val().name
        })
        .then(() => this.loading = false);
      })
    }

    getLastGeo(){
      if(this.contact._geo){
        _.last(this.contact._geo, function(geo){
          console.log(geo);
        })
      }
    }
}
