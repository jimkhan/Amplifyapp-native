import React, {useContext, useEffect, useState} from 'react';
import Clipboard from '@react-native-community/clipboard';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue } from "react-native-responsive-fontsize";

import DocumentPicker from 'react-native-document-picker';

import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CountDown from 'react-native-countdown-component';
import {RTCView} from 'react-native-webrtc';
import UserContext from '../Context/Context';
import HomeScreen from '../Screens/HomeScreens';

const MeetingScreens = ({navigation}) => {
  // const [micColor, setMicColor] = useState('red');
  const [files, setFiles] = useState([])
  const [handColor, setHandColor] = useState('white');
  const {
    room,
    SetRoom,
    myStream,
    userStream,
    anotherUserStream,
    socket,
    userId,
    joinedUser,
  } = useContext(UserContext);

  const {room_id, speaker, title, users} = room;

  // console.log(room);
  // console.log('my stream', myStream._tracks[0].muted);
  // console.log('user strea', userStream);
  // console.log('anoter stream', anotherUserStream);
  // const usersArr = Object.values(room.users);
  // usersArr.map((item) => console.log(item.socket_id));

  const copyToClipboard = () => {
    Clipboard.setString(`${room_id}`);
  };

  // rising hand function

  const toggleHand = (room_id) => {
    socket.emit('raiseHand', {room_id});
    socket.on('updateRoom', (room) => {
      SetRoom(room);
    });

    // socket.on('retreatHand', (user) => {
    //   console.log(user);
    // });
  };

  let micColor;
  const usersFromRoom = Object.keys(users);
  const speakerUser = usersFromRoom.find((item) => item === speaker);

  const isSpeaker = speakerUser === joinedUser.socket_id;
  isSpeaker ? (micColor = '#5DD200') : (micColor = 'red');
  const [count, SetCount] = useState(0);
  useEffect(() => {
    isSpeaker && setHandColor('white');
    SetCount(10 * 60);
  }, [isSpeaker]);

  const combinedFunction = () => {
    !isSpeaker && setHandColor(handColor === 'white' ? '#5DD200' : 'white');
    !isSpeaker && toggleHand(room_id);
  };

  // condition for speakers name

  const openDocument = async()=>{

    console.log("Document")
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      console.log(
        res.uri,
        res.type, // mime type
        res.name,
        res.size
      );
      setFiles([...files, res])
      console.log(res)
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  }

  const usersOfRoom = Object.values(users);
  const speakerName = usersOfRoom.find((item) => item.socket_id === speaker);
  const realUser = usersOfRoom.find(
    (item) => item.socket_id === joinedUser.socket_id,
  );
  // console.log('bal ta ki run hoyna naki', speakerName.name, joinedUser.name);
  //
  const banned_devices = Object.keys(room.banned_devices);
  const bandItem = banned_devices.find((item) => item);
  // console.log(banned_devices);
  // console.log(userId, bandItem);
  if (userId === bandItem || !realUser) {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 60,
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={styles.bannedBtn}>
          <Text style={styles.bannedText}>Something wrong ? back to home</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <SafeAreaView style={styles.droidSafeArea}>
        <View style={styles.conatiner}>
          <View>
            <Text style={styles.discussText}>
              Topic of Discussion : {title}
            </Text>
            <Text style={styles.meetingText}>Meeting code : {room_id}</Text>
            <TouchableOpacity onPress={copyToClipboard}>
              <View style={styles.copyText}>
                <MaterialIcons
                  name="content-copy"
                  size={16}
                  color="white"
                  style={styles.copyIcon}
                />
                <Text style={styles.clipboardText}>Copy meeting Code</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.userIcon}>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-evenly',
              }}>
              {myStream && (
                <RTCView
                  streamURL={myStream.toURL()}
                  style={{
                    height: 20,
                    width: 20,
                    borderRadius: 10,
                    marginVertical: 5,
                    backgroundColor: 'transparent',
                    zOrder: -1,
                  }}></RTCView>
              )}
              {userStream && (
                <RTCView
                  streamURL={userStream.toURL()}
                  style={{
                    height: 20,
                    width: 20,
                    borderRadius: 10,
                    marginVertical: 5,
                    backgroundColor: 'transparent',
                    zOrder: -1,
                  }}></RTCView>
              )}
              {anotherUserStream && (
                <RTCView
                  streamURL={anotherUserStream.toURL()}
                  style={{
                    height: 20,
                    width: 20,
                    borderRadius: 10,
                    marginVertical: 5,
                    backgroundColor: 'transparent',
                    zOrder: -1,
                  }}></RTCView>
              )}
            </View>

            {speakerName ? (
              <View style={styles.userIconStyle}>
                <Feather name="user" color="lightgray" size={300} />
              </View>
            ) : (
              <View>
                <Text style={{color: 'white', fontSize: RFValue(22), fontFamily: "Ubuntu-Bold",}}>
                  No Speaker is Active
                </Text>
                <Text style={{color: 'white', fontSize: RFValue(12), fontFamily: "Ubuntu-Bold",}}>
                  Raise hand to request to speak
                </Text>
              </View>
            )}
          </View>
          <View style={{marginVertical: 10}}>
            {speakerName && (
              <View>
                <Text
                  style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: 'white',
                  }}>
                  Speaker: {speakerName && speakerName.name}
                </Text>
                <Text style={{textAlign: 'center', color: 'white'}}>
                  <CountDown
                    id={speaker}
                    until={count}
                    size={12}
                    onFinish={() => alert("Time's up for the speaker")}
                    digitStyle={{backgroundColor: 'transparent'}}
                    digitTxtStyle={{color: '#fff'}}
                    separatorStyle={{color: '#fff'}}
                    timeToShow={['M', 'S']}
                    timeLabels={{m: null, s: null}}
                    showSeparator
                    style={{alignItems: 'center', justifyContent: 'center'}}
                  />
                </Text>
              </View>
            )}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginVertical: 15,
              }}>
              <TouchableOpacity style={styles.uploadMemberStyle} onPress={() => navigation.navigate("FilesUploadScreen", {files: files})} >
                <MaterialIcons
                  name="upload-file"
                  size={24}
                  color="white"
                  style={styles.copyIcon}
                />
                <Text style={styles.clipboardText}>Upload Files</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.uploadMemberStyle}
                onPress={() =>
                  navigation.navigate('MembersScreens', {
                    users: users,
                  })
                }>
                <FontAwesome5
                  name="users"
                  size={RFValue(22)}
                  color="white"
                  style={styles.copyIcon}
                />
                <Text style={styles.clipboardText}>Members</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.bottomIconView}>
          <TouchableOpacity style={styles.bottomBtn} onPress={openDocument} >
            <Feather name="upload" size={RFValue(22)} color="white" />
            <Text style={{color: 'white', fontSize: RFValue(14)}}>Upload</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomBtn}>
            <Feather name="mic" size={RFValue(22)} color={micColor} />
            <Text style={{color: micColor, fontSize: RFValue(14)}}>Microphone</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomBtn} onPress={combinedFunction}>
            <Ionicons name="hand-right-outline" size={RFValue(22)} color={handColor} />
            <Text style={{color: handColor, fontSize: RFValue(14)}}>Raise Hand</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
};

export default MeetingScreens;

const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    backgroundColor: 'white',
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  conatiner: {
    backgroundColor: '#101010',
    flex: 1,
    padding: 16,
  },
  textStyle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: RFValue(16),
    fontFamily: "Ubuntu-Bold",
  },
  button: {
    backgroundColor: '#7E52A2',
    marginVertical: 10,
    marginHorizontal: 30,
    padding: 20,
    borderRadius: 8,
    width: 300,
  },
  discussText: {
    fontSize: RFValue(23),
    // fontWeight: '700',
    fontFamily: "Ubuntu-Bold",
    marginVertical: 5,
    color: '#fff',
  },
  meetingText: {
    fontSize: RFValue(16),
    fontFamily: "Ubuntu-Bold",
    color: '#fff',
    marginBottom: 10,
  },
  copyText: {
    borderWidth: 1,
    borderColor: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 8,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: wp(45),
    borderRadius: 8,
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#202020',
    fontFamily: "Ubuntu-Bold",
  },
  uploadMemberStyle: {
    paddingVertical: 5,
    paddingHorizontal: 8,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: wp(35),
    borderRadius: hp(1),
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#7E52A2',
  },
  clipboardText: {
    color: 'white',
    fontFamily: "Ubuntu-Bold",
  },
  userIcon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomIconView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    backgroundColor: '#202020',
  },
  bottomBtn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannedBtn: {
    borderWidth: 1,
    borderColor: '#7E52A2',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
    backgroundColor: '#7E52A2',
    marginHorizontal: 'auto',
    borderRadius: 10,
  },
  bannedText: {
    color: 'white',
    fontFamily: "Ubuntu-Bold",
  },
  userIconStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100000000,
  },
});
