// @flow
import {observable, computed} from "mobx";

import {Firebase} from "../components";

export default class CallStore {

  @observable _pcPeers: Object = {};
  @computed get pcPeers():Object { return this._pcPeers; }
  set pcPeers(pcPeers:Object) { this._pcPeers = pcPeers; }

  @observable _localStream: any = null;
  @computed get localStream():any { return this._localStream; }
  set localStream(localStream:any) { this._localStream = localStream; }

  @observable _info: string = 'Initializing';
  @computed get info(): string { return this._info; }
  set info(info: string) { this._info = info; }

  @observable _status: string = 'init';
  @computed get status(): string { return this._status; }
  set status(status: string) { this._status = status; }

  @observable _roomID: string = '';
  @computed get roomID(): string { return this._roomID; }
  set roomID(roomID: string) { this._roomID = roomID; }

  @observable _isFront: boolean = true;
  @computed get isFront(): boolean { return this._isFront; }
  set isFront(isFront: boolean) { this._isFront = isFront; }

  @observable _selfViewSrc: any = null;
  @computed get selfViewSrc(): any { return this._selfViewSrc; }
  set selfViewSrc(selfViewSrc: any) { this._selfViewSrc = selfViewSrc; }

  @observable _remoteList: any = null;
  @computed get remoteList(): any { return this._remoteList; }
  set remoteList(remoteList: any) { this._remoteList = remoteList; }

  @observable _textRoomConnected: boolean = false;
  @computed get textRoomConnected(): boolean { return this._textRoomConnected; }
  set textRoomConnected(textRoomConnected: boolean) { this._textRoomConnected = textRoomConnected; }

  @observable _textRoomData: Array<Object> = [];
  @computed get textRoomData(): Array<Object> { return this._textRoomData; }
  set textRoomData(textRoomData: Array<Object>) { this._textRoomData = textRoomData; }

  @observable _textRoomValue: string= '';
  @computed get textRoomValue(): string { return this._textRoomValue; }
  set textRoomValue(textRoomValue: string) { this._textRoomValue = textRoomValue; }

  @observable _loading: boolean = false;
  @computed get loading(): boolean { return this._loading; }
  set loading(loading: boolean) { this._loading = loading; }

  @observable _configuration: Object = {};
  @computed get configuration(): Object { return this._configuration; }
  set configuration(configuration:Object) { this._configuration = configuration; }

  @observable _ioServer: string = '';
  @computed get ioServer(): string { return this._ioServer; }
  set ioServer(ioServer:string) { this._ioServer = ioServer; }

  init(configurationStun:Object, ioServer:string){
    this.ioServer = ioServer;
    this.configuration = configurationStun;
  }
}
