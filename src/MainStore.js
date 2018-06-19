// @flow
import moment from "moment";
import * as _ from "lodash";
import {observable, computed, action} from "mobx";

import {Firebase} from "./components";
import type {User, Task} from "./Model";
import geofire from 'geofire';

import Geolocation from "react-native-geolocation-service";

import distance from "@turf/distance";
import autobind from "autobind-decorator";
const turfPoint = require("turf-point");

export default class MainStore {

    @observable _user: User;
    @observable _value: any;

    @observable _lat: number = 0;
    @observable _lng: number = 0;

    @observable _prevLat: number = 0;
    @observable _prevLng: number = 0;

    @observable _time: number;
    @observable _heading: number = 0;
    @observable _error: string;

    @observable _currentNavigation: string = null;
    @observable _currentTask: string = null;

    @computed get user(): User { return this._user; }
    set user(user: User) { this._user = user; }

    @computed get value():any { return this._value; }
    set value(value: any) { this._value = value; }

    @computed get prevLat(): number { return this._prevLat; }
    set prevLat(prevLat: number) { this._prevLat = prevLat }

    @computed get prevLng(): number { return this._prevLng; }
    set prevLng(prevLng: number) { this._prevLng = prevLng }

    @computed get lat(): number { return this._lat; }
    set lat(lat: number) { this._lat = lat }

    @computed get lng(): number { return this._lng; }
    set lng(lng: number) { this._lng = lng }

    @computed get time(): number { return this._time; }
    set time(time: number) { this._time = time }

    @computed get heading(): number { return this._heading; }
    set heading(heading: number) { this._heading = heading }

    @computed get error(): string { return this._error }
    set error(error:string) { this._error = error; }

    @computed get currentNavigation(): string { return this._currentNavigation }
    set currentNavigation(currentNavigation:string) { this._currentNavigation = currentNavigation; }

    @computed get currentTask(): string { return this._currentTask }
    set currentTask(currentTask:string) { this._currentTask = currentTask; }

    init() {
        console.log(Firebase);
        Firebase.userRef.on("value", snapshot => {
            this.user = snapshot.val();
        });
        this.updateCurrentLocation();
    }

    get taskCount(): number {
        return this.user ? Object.keys(this.user.tasks || {}).length : 0;
    }

    get completedTaskCount(): number {
        return this.user ? _.map(this.user.tasks || {}, task => task).filter(task => task.done).length : 0;
    }

    get overdueTaskCount(): number {
        const now = (new Date()).getTime() / 1000;
        return this.user ? _.map(this.user.tasks || {}, task => task)
                .filter(task => !task.done)
                .filter(task => task.time <= now).length
            : 0;
    }

    getTasksOfDay(day: number, month: number): Task[] {
        return this.user
            ?
                _.map(this.user.tasks || {}, task => task)
                    .filter(task => {
                        const time = moment.unix(task.time);
                        return day === time.date() && month === time.month();
                    })
            :
                []
            ;

    }
    
    @autobind
    updateCurrentLocation() {
        const prevLocation = turfPoint([this.prevLng, this.prevLat]);
        const currLocation = turfPoint([this.lng, this.lat]);

        Geolocation.getCurrentPosition(
          this.saveLocation,
          this.saveLocationError,
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 },
        );

      // Idea for the future :
      // Download new route only if user chose a new route
      if (distance(prevLocation, currLocation) > 0.1) { // Distance greater than 100m
        this.prevLat = this.lat
        this.prevLng = this.lng
      }
    }

    @autobind
    saveLocation(location: any) {
        this.time = location.timestamp;
        this.lat = location.coords.latitude;
        this.lng = location.coords.longitude;
        this.heading =  location.coords.heading;

        // First time
        if (this.prevLat === 0 && this.prevLng === 0) {
            this.prevLat = location.coords.latitude;
            this.prevLng = location.coords.longitude;
        }
    }

    @autobind
    setCurrentNavigation(key: string) {
        this.currentNavigation = key;
    }

    @autobind
    setCurrentTask(key: string) {
        this.currentTask = key;
    }

    @autobind
    saveLocationError(error: any) {
        this.error = error;
    }

    getTasksOfWeek(week: number): Task[] {
        return this.user
            ?
                _.map(this.user.tasks || {}, task => task)
                    .filter(task => moment.unix(task.time).week() === week)
            :
                []
        ;
    }

    getValueById(ref: string):any {
       return Firebase.database.ref(ref).once('value');
    }


    getTasksOfMonth(month: number): Task[] {
        return this.user
            ?
                _.map(this.user.tasks || {}, task => task)
                    .filter(task => moment.unix(task.time).month() === month)
            :
                []
        ;
    }

    getDistance(location1:Array<number>, location2:Array<number>):number {
       return geofire.distance(location1,location2);
    }
}
