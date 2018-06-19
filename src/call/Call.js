// @flow
import moment from "moment";
import * as _ from "lodash";
import * as React from "react";
import {View, Text, StyleSheet, TextInput, ListView, TouchableHighlight, Platform} from "react-native";
import {H3} from "native-base";
import {observer, inject} from 'mobx-react/native';
import io from 'socket.io-client';
import type {ScreenProps, StoreProps} from "../components/Types";
import {Avatar, Styles, Badge} from "../components";
import {RTCPeerConnection, RTCMediaStream, RTCIceCandidate, RTCSessionDescription, RTCView, MediaStreamTrack, getUserMedia} from 'react-native-webrtc';
import CallStore from './CallStore';
import variables from "../../native-base-theme/variables/commonColor";


var callStore = new CallStore();
callStore.init({"iceServers": [{"url": "stun:stun.l.google.com:19302"}]},"https://react-native-webrtc.herokuapp.com")
const socket = io.connect(callStore.ioServer, {transports: ['websocket']});

function getLocalStream(isFront, callback) {

  let videoSourceId;

  if (Platform.OS === 'ios') {
    MediaStreamTrack.getSources(sourceInfos => {
      console.log("sourceInfos: ", sourceInfos);

      for (let i = 0; i < sourceInfos.length; i++) {
        const sourceInfo = sourceInfos[i];
        if(sourceInfo.kind == "video" && sourceInfo.facing == (isFront ? "front" : "back")) {
          videoSourceId = sourceInfo.id;
        }
      }
    });
  }
  getUserMedia({
    audio: true,
    // video: {
    //   mandatory: {
    //     minWidth: 640, // Provide your own width, height and frame rate here
    //     minHeight: 360,
    //     minFrameRate: 30,
    //   },
    //   facingMode: (isFront ? "user" : "environment"),
    //   optional: (videoSourceId ? [{sourceId: videoSourceId}] : []),
    // }
    video: false
  }, function (stream) {
    console.log('getUserMedia success', stream);
    callback(stream);
  }, logError);
}

function join(roomID) {
  socket.emit('join', roomID, function(socketIds){
    console.log('join', socketIds);
    for (const i in socketIds) {
      const socketId = socketIds[i];
      createPC(socketId, true);
    }
  });
}

function createPC(socketId, isOffer) {
  console.log("socket",socketId)
  const pc = new RTCPeerConnection(callStore.configuration);
  callStore.pcPeers[socketId] = pc;

  pc.onicecandidate = function (event) {
    console.log('onicecandidate', event.candidate);
    if (event.candidate) {
      socket.emit('exchange', {'to': socketId, 'candidate': event.candidate });
    }
  };

  function createOffer() {
    pc.createOffer(function(desc) {
      console.log('createOffer', desc);
      pc.setLocalDescription(desc, function () {
        console.log('setLocalDescription', pc.localDescription);
        socket.emit('exchange', {'to': socketId, 'sdp': pc.localDescription });
      }, logError);
    }, logError);
  }

  pc.onnegotiationneeded = function () {
    console.log('onnegotiationneeded');
    if (isOffer) {
      createOffer();
    }
  }

  pc.oniceconnectionstatechange = function(event) {
    console.log('oniceconnectionstatechange', event.target.iceConnectionState);
    if (event.target.iceConnectionState === 'completed') {
      setTimeout(() => {
        getStats();
      }, 1000);
    }
    if (event.target.iceConnectionState === 'connected') {
      createDataChannel();
    }
  };

  pc.onsignalingstatechange = function(event) {
    console.log('onsignalingstatechange', event.target.signalingState);
  };

  pc.onaddstream = function (event) {
    console.log('onaddstream', event.stream);
    callStore.info = 'One peer join!';

    const remoteList = callStore.remoteList;
    remoteList[socketId] = event.stream.toURL();
    callStore.remoteList = remoteList;
    console.log("remoteList",callStore.remoteList);
  };
  pc.onremovestream = function (event) {
    console.log('onremovestream', event.stream);
  };

  pc.addStream(callStore.localStream);
  function createDataChannel() {
    if (pc.textDataChannel) {
      return;
    }
    const dataChannel = pc.createDataChannel("text");

    dataChannel.onerror = function (error) {
      console.log("dataChannel.onerror", error);
    };

    dataChannel.onmessage = function (event) {
      console.log("dataChannel.onmessage:", event.data);
      receiveTextData({user: socketId, message: event.data});
    };

    dataChannel.onopen = function () {
      console.log('dataChannel.onopen');
      callStore.textRoomConnected= true;
    };

    dataChannel.onclose = function () {
      console.log("dataChannel.onclose");
    };

    pc.textDataChannel = dataChannel;
  }
  return pc;
}

function exchange(data) {
  const fromId = data.from;
  let pc;
  if (fromId in callStore.pcPeers) {
    pc = callStore.pcPeers[fromId];
  } else {
    pc = createPC(fromId, false);
  }

  if (data.sdp) {
    console.log('exchange sdp', data);
    pc.setRemoteDescription(new RTCSessionDescription(data.sdp), function () {
      if (pc.remoteDescription.type == "offer")
        pc.createAnswer(function(desc) {
          console.log('createAnswer', desc);
          pc.setLocalDescription(desc, function () {
            console.log('setLocalDescription', pc.localDescription);
            socket.emit('exchange', {'to': fromId, 'sdp': pc.localDescription });
          }, logError);
        }, logError);
    }, logError);
  } else {
    console.log('exchange candidate', data);
    pc.addIceCandidate(new RTCIceCandidate(data.candidate));
  }
}

function leave(socketId) {
  console.log('leave', socketId);
  const pc = callStore.pcPeers[socketId];
  const viewIndex = pc.viewIndex;
  pc.close();
  delete callStore.pcPeers[socketId];

  const remoteList = callStore.remoteList;
  delete remoteList[socketId]
  callStore.remoteList= remoteList;
  callStore.info= 'One peer leave!';
}

socket.on('exchange', function(data){
  exchange(data);
});
socket.on('leave', function(socketId){
  leave(socketId);
});

socket.on('connect', function(data) {
  console.log('connect');
  getLocalStream(true, function(stream) {
    callStore.localStream = stream;
    callStore.selfViewSrc= stream.toURL();
    callStore.status= 'ready'; callStore.info= 'Please enter or create room ID';
  });
});

function logError(error) {
  console.log("logError", error);
}

function mapHash(hash, func) {
  const array = [];
  for (const key in hash) {
    const obj = hash[key];
    array.push(func(obj, key));
  }
  return array;
}

function getStats() {
  const pc = callStore.pcPeers[Object.keys(callStore.pcPeers)[0]];
  if (pc.getRemoteStreams()[0] && pc.getRemoteStreams()[0].getAudioTracks()[0]) {
    const track = pc.getRemoteStreams()[0].getAudioTracks()[0];
    console.log('track', track);
    pc.getStats(track, function(report) {
      console.log('getStats report', report);
    }, logError);
  }
}

function receiveTextData(data) {
  const textRoomData = callStore.textRoomData.slice();
  textRoomData.push(data);
  callStore.textRoomData = textRoomData;
  callStore.textRoomValue =  '';
}

@inject('store')
@observer
export default class Call extends React.Component<ScreenProps<> & StoreProps>  {


  //$FlowFixMe
  constructor(props){
    super(props);
    //$FlowFixMe
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => true});
  }


  _press(event) {
    callStore.status = 'connect'
    callStore.info = 'Connecting'
    join(callStore.roomID);
  }
  _switchVideoType() {
    const isFront = !callStore.isFront;
    callStore.isFront = isFront;
    getLocalStream(isFront, function(stream) {
      if (callStore.localStream) {
        for (const id in callStore.pcPeers) {
          const pc = callStore.pcPeers[id];
          pc && pc.removeStream(callStore.localStream);
        }
        callStore.localStream.release();
      }
      callStore.localStream = stream;
      callStore.selfViewSrc = stream.toURL();

      for (const id in callStore.pcPeers) {
        const pc = callStore.pcPeers[id];
        pc && pc.addStream(callStore.localStream);
      }
    });
  }

  _textRoomPress() {
    if (!callStore.textRoomValue) {
      return
    }
    const textRoomData = callStore.textRoomData.slice();
    textRoomData.push({user: 'Moi', message: callStore.textRoomValue});
    for (const key in callStore.pcPeers) {
      const pc = callStore.pcPeers[key];
      pc.textDataChannel.send(callStore.textRoomValue);
    }
    callStore.textRoomData = textRoomData;
    callStore.textRoomValue=  '';
  }
  _renderTextRoom() {
    return (
      <View style={styles.listViewContainer}>
        <ListView
          dataSource={this.ds.cloneWithRows(callStore.textRoomData)}
          renderRow={rowData => <Text>{`${rowData.user}: ${rowData.message}`}</Text>}
          />
        <TextInput
          style={{width: 200, height: 30, borderColor: 'gray', borderWidth: 1}}
          onChangeText={value => callStore.textRoomValue= value}
          value={callStore.textRoomValue}
        />
        <TouchableHighlight
          onPress={this._textRoomPress}>
          <Text>Envoyer</Text>
        </TouchableHighlight>
      </View>
    );
  }
  _setRoomID(text){
    callStore.roomID = text.toLowerCase();
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {callStore.info}
        </Text>
        {callStore.textRoomConnected && this._renderTextRoom()}
        <View style={{flexDirection: 'row'}}>
          <Text>
            {callStore.isFront ? "Use front camera" : "Use back camera"}
          </Text>
          <TouchableHighlight
            style={{borderWidth: 1, borderColor: 'black'}}
            onPress={this._switchVideoType}>
            <Text>Switch camera</Text>
          </TouchableHighlight>
        </View>
        { callStore.status == 'ready' ?
          (<View>
            <TextInput
              ref='roomID'
              autoCorrect={false}
              style={{width: 200, height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(text) => this._setRoomID(text)}
              value={callStore.roomID}
            />
            <TouchableHighlight
              onPress={this._press}>
              <Text>Enter room</Text>
            </TouchableHighlight>
          </View>) : null
        }
        <RTCView streamURL={callStore.selfViewSrc} style={styles.selfView}/>
        {
          mapHash(callStore.remoteList, function(remote, index) {
            return <RTCView key={index} streamURL={remote} style={styles.remoteView}/>
          })
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  selfView: {
    width: 200,
    height: 150,
  },
  remoteView: {
    width: 200,
    height: 150,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  listViewContainer: {
    height: 150,
  },
});
