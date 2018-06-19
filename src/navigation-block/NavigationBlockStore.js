// @flow
import {observable, computed} from "mobx";
import moment from "moment";
import type {Task, Company} from "../Model";
import { Firebase } from "../components";

export default class NavigationBlockStore {

    @observable _loading: boolean = true;
    @observable _loadingRoute: boolean = true;

    @observable _task: Task;

    @observable _company: Company;

    @observable _route: object;
    @observable _detailedRoute: object;
    @observable _distance: number;
    @observable _duration: number;

    @observable _taskRef;

    @observable _isMessageModalVisible: boolean = false;
    @observable _isEndModalVisible: boolean = false;
    @observable _isRecordModalVisible: boolean = false;
    @observable _isStoppedModalVisible: boolean = false;

    @observable _isFarAway: boolean = true;

    @observable _modalTitle: string = "";

    @computed get task(): Task {return this._task;}
    set task(task:Task){this._task = task;}

    @computed get taskRef(): any {return this._taskRef;}
    set taskRef(taskRef){this._taskRef = taskRef;}

    @computed get loading(): boolean { return this._loading; }
    set loading(loading: boolean) { this._loading = loading; }

    @computed get loadingRoute(): boolean { return this._loadingRoute; }
    set loadingRoute(loadingRoute: boolean) { this._loadingRoute = loadingRoute; }

    @computed get isMessageModalVisible(): boolean { return this._isMessageModalVisible; }
    set isMessageModalVisible(isMessageModalVisible: boolean) { this._isMessageModalVisible = isMessageModalVisible; }

    @computed get isEndModalVisible(): boolean { return this._isEndModalVisible; }
    set isEndModalVisible(isEndModalVisible: boolean) { this._isEndModalVisible = isEndModalVisible; }

    @computed get isRecordModalVisible(): boolean { return this._isRecordModalVisible; }
    set isRecordModalVisible(isRecordModalVisible: boolean) { this._isRecordModalVisible = isRecordModalVisible; }

    @computed get isStoppedModalVisible(): boolean { return this._isStoppedModalVisible; }
    set isStoppedModalVisible(isStoppedModalVisible: boolean) { this._isStoppedModalVisible = isStoppedModalVisible; }

    @computed get isFarAway(): boolean { return this._isFarAway; }
    set isFarAway(isFarAway: boolean) { this._isFarAway = isFarAway; }

    @computed get modalTitle(): string { return this._modalTitle; }
    set modalTitle(modalTitle: string) { this._modalTitle = modalTitle; }

    @computed get company(): Company { return this._company; }
    set company(company: Company) { this._company = company}

    @computed get route(): any { return this._route; }
    set route(route: any) { this._route = route; }

    @computed get detailedRoute(): string { return this._detailedRoute }
    set detailedRoute(detailedRoute:string) { this._detailedRoute = detailedRoute; }

    @computed get distance(): string { return this._distance }
    set distance(distance:string) { this._distance = distance; }

    @computed get duration(): string { return this._duration }
    set duration(duration:string) { this._duration = duration; }
    
    constructor(key: string, callback) {
      this.taskRef = Firebase.userRef.child(`/tasks/${key}`);
      this.taskRef.once("value")
            .then(task => this.task = task.val()).then(() => {
              Firebase.database.ref(this.task.company).once("value")
                    .then(company => this.company = company.val())
                    .then( () => callback() )
                    .then(() =>  this.loading = false)
            });
    }

    startNavigatingTime = () => {
      this.taskRef.child("dateStartNavigation").set(moment().unix());
    }

    endNavigatingTime = () => {
      this.taskRef.child("dateEndNavigation").set(moment().unix());
    }

    startWorkingTime = () => {
      this.taskRef.child("dateStartTask").set(moment().unix());
    }

    endWorkingTime = () => {
      this.taskRef.child("dateEndTask").set(moment().unix());
    }
}
