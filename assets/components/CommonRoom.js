import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';

import colors from '../config/colors';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue } from "react-native-responsive-fontsize";


import Icon from 'react-native-vector-icons/Feather';
import UserContext from '../Context/Context';

const CommonRoom = ({
  navigation,
  id,
  Label1,
  Label2,
  buttonText,
  placeHolderText,
}) => {
  const [name, SetName] = useState('');
  const [topics, SetTopics] = useState('');
  const [roomId, SetRoomId] = useState('');
  const {SetRoom, socket, peerId, SetJoinedUser, SetUserId} = useContext(
    UserContext,
  );

  // console.log(id);

  const submitHandler = () => {
    if (buttonText === 'Create Room') {
      socket.emit('createRoom', {title: topics, device_id: id}, (data) => {
        if (data) {
          socket.emit(
            'joinRoom',
            {
              name: name,
              device_id: id,
              peer_id: peerId,
              room_id: data.room_id,
            },
            (data) => {
              // console.log(data);
              if (data) {
                SetRoom(data.room);
                SetJoinedUser(data.user);
                // console.log(data);
                navigation.navigate('MeetingScreen');
              }
            },
          );
        }
      });
    } else {
      socket.emit(
        'joinRoom',
        {
          name: name,
          device_id: id,
          peer_id: peerId,
          room_id: roomId,
        },
        (data) => {
          // console.log(data);
          if (data) {
            SetRoom(data.room);
            SetJoinedUser(data.user);
            navigation.navigate('MeetingScreen');
          }
        },
      );
    }
  };

  return (
    <View style={styles.conatiner}>
      <Icon name="user" color="gray" size={RFValue(75)} style={styles.userIcon} />
      <Text style={styles.labelTextStyle}>
        {Label1}
        <Icon name="target" color="red" size={RFValue(10)} />
      </Text>
      <TextInput
        style={styles.inputStyle}
        name="name"
        placeholder="Enter Your Name"
        placeholderTextColor="gray"
        autoCapitalize="none"
        autoCorrect={false}
        value={name}
        onChangeText={(name) => SetName(name)}
      />
      <Text style={styles.labelTextStyle}>
        {Label2}
        <Icon name="target" color="red" size={RFValue(10)} />
      </Text>
      <TextInput
        style={styles.inputStyle}
        name={buttonText === 'Create Room' ? 'topics' : 'roomId'}
        placeholder={placeHolderText}
        placeholderTextColor="gray"
        autoCapitalize="none"
        autoCorrect={false}
        value={buttonText === 'Create Room' ? topics : roomId}
        onChangeText={
          buttonText === 'Create Room'
            ? (topics) => SetTopics(topics)
            : (roomId) => SetRoomId(roomId)
        }
      />
      <TouchableOpacity style={styles.button} onPress={submitHandler}>
        <Text style={styles.textStyle}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CommonRoom;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: colors.backBody,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: RFValue(16),
    fontFamily: "Ubuntu-Bold"
  },
  labelTextStyle: {
    color: '#fff',
    textAlign: 'left',
    fontSize: RFValue(16),
  },
  button: {
  backgroundColor: '#7E52A2',
  marginVertical: hp(2.6),
  // marginHorizontal: 30,
  padding: hp(2),
  borderRadius: hp(1),
  width: wp(75),
  },
  inputStyle: {
    backgroundColor: '#505050',
    color: '#fff',
    borderRadius: hp(1),
    width: wp(75),
    padding: hp(1.4),
    marginVertical: 10,
    fontSize: RFValue(16),
    fontFamily: "Ubuntu-Bold"
  },
  userIcon: {
    marginBottom: 30,
  },
});


// backgroundColor: '#7E52A2',
// marginVertical: hp(1.6),
// // marginHorizontal: 30,
// padding: hp(2.7),
// borderRadius: 8,
// width: wp(75),
