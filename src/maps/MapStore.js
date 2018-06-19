// @flow
import {observable, computed } from "mobx";
import moment from "moment";

import type {Tasks, Task, Geoloc,Geolocs} from "../Model";
import MainStore from "../MainStore";
import {Firebase} from "../components";
import * as GeoFire from "geofire";



export default class MapStore {
    @observable _geo: Geolocs;

    static geoFire: any;

    @computed get _geo(): Geolocs {return this._geo;}
    set _geo(geo:Geolocs) { this._geo = geo;}

    static get geoRef(): any {
      return MapStore.geoFire.ref();
    }

    // async save(): Promise<void> {
    //   this.loading = true;
    //   const { lat, lng, time } = this.store;

    //   const geo : Geoloc = { lat, lng, time}

    //   await Firebase.userRef.child("_geo").push(geo);
    //   this.loading = false;
    // }
}
