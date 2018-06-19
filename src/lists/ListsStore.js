// @flow
import {observable, computed, useStrict} from "mobx";
import * as _ from "lodash";
import type {Tasks} from "../Model";
import {Firebase} from "../components";

export default class ListsStore {

    @observable _loading: boolean = true;
    @observable _loadingCompany = true;
    @observable _loadingService = true;
    @observable _tasks: Tasks;

    @computed get tasks(): Tasks { return this._tasks; }
    set tasks(tasks: Tasks) { this._tasks = tasks; }

    @computed get loading(): boolean { return this._loading; }
    set loading(loading: boolean) { this._loading = loading; }

    @computed get loadingCompany(): boolean { return this._loadingCompany; }
    set loadingCompany(loadingCompany: boolean) { this._loadingCompany = loadingCompany; }

    @computed get loadingService(): boolean { return this._loadingService; }
    set loadingService(loadingService: boolean) { this._loadingService = loadingService; }

    constructor() {
      useStrict(false);
        Firebase.getUser()
            .then((user) => {
              this.tasks = user.tasks;
              _.map(this.tasks, ((task) => {
                  Firebase.database.ref(task.company).once('value').then(company => task.company = company.val()).then(() => {
                    Firebase.database.ref(task.service).once('value').then(service => task.service = service.val()).then(() => {
                      return task;
                    }).finally(() => {this.loading = false; return task; });
                  }).finally(() => { return task; });
                  return task
              }));
            })
        useStrict(false);
    }

    get overdueTask(): Tasks {
      const now = (new Date()).getTime() / 1000;
      return  _.map(this.tasks || {}, task => task)
              .filter(task => !task.done)
              .filter(task => task.time <= now)
    }

    get overdueTaskCount(): number {
        const now = (new Date()).getTime() / 1000;
        return this.tasks ? _.map(this.tasks || {}, task => task)
                .filter(task => !task.done)
                .filter(task => task.time <= now).length
            : 0;
    }

    getValueById(ref: string):any {
      return Firebase.database.ref(ref).once('value').then(value => value.val());
    }

    toggleItem(key: string, done: boolean) {
        Firebase.userRef.child(`tasks/${key}/done`).set(done);
    }
}
