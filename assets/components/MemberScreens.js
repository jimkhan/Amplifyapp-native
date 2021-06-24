import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import fakeUsers from '../fakeData/fakeUsers';
import ModalComponent from '../components/Modal';
import UserContext from '../Context/Context';

const MembersScreens = ({navigation}) => {
  const {joinedUser, room, socket} = useContext(UserContext);

  // console.log(room.users);
  const usersArr = Object.values(room.users);

  socket.on('userJoined', (user) => {
    console.log(user);
  });

  // functions

  const changeSpeaker = (data) => {
    socket.emit('changeSpeaker', data);

    console.log('chage spekeer', data);
    //     if (user) {
    //       socket.on('updateRoom', (room) => {
    //         console.log(room);
    //       });
    //       socket.on('changeSpeaker', (user) => {
    //         console.log(user);
    //       });
    //     } else {
    //       socket.on('errorRoom', (error) => {
    //         // SetRoom(room);
    //         console.log(error);
    //       });
    //     }
    //   });
  };
  const leaveMeeting = (data) => {
    socket.emit('exitRoom', data);
  };
  const usersOfRoom = Object.values(room.users);
  const realUser = usersOfRoom.find(
    (item) => item.socket_id === joinedUser.socket_id,
  );
  if (!realUser) {
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
          <View style={styles.memberHeader}>
            <View style={styles.memberHeaderLeft}>
              <FontAwesome5
                name="users"
                size={24}
                color="black"
                style={styles.copyIcon}
              />
              <Text style={{fontSize: 24, fontWeight: 'bold'}}>Members</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <EvilIcons name="close" size={36} color="black" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={usersArr}
            keyExtractor={(item) => item.socket_id}
            renderItem={({item}) => (
              <View style={styles.users}>
                <View style={styles.userList}>
                  <View style={styles.user}>
                    <Text>{item.name} </Text>
                    {item.hand_risen && (
                      <View style={styles.handRise}>
                        <Ionicons
                          name="hand-right-outline"
                          size={24}
                          color="green"
                        />
                        <Text>( Raise Hand )</Text>
                      </View>
                    )}
                  </View>
                  <View>
                    <ModalComponent
                      room_id={room.room_id}
                      socket_id={item.socket_id}
                    />
                  </View>
                </View>
                {item.hand_risen && (
                  <TouchableOpacity
                    style={styles.allowBtn}
                    onPress={() =>
                      changeSpeaker({
                        room_id: room.room_id,
                        socket_id_to_speak: item.socket_id,
                      })
                    }>
                    <Text style={{color: 'green', fontWeight: 'bold'}}>
                      Allow Speaker
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          />
          <View style={styles.memberBottom}>
            <TouchableOpacity
              style={styles.leaveBtn}
              onPress={() => leaveMeeting({room_id: room.room_id})}>
              <Text style={styles.leaveBtnText}>Leave Meeting</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={styles.leaveBtn}
              onPress={() => endMeeting({room_id: room.room_id})}>
              <Text style={styles.leaveBtnText}>End Meeting</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </SafeAreaView>
    );
  }
};

export default MembersScreens;

const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    backgroundColor: 'white',
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  conatiner: {
    backgroundColor: 'white',
    flex: 1,
    padding: 16,
  },
  memberHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'black',
    paddingBottom: 10,
  },
  memberHeaderLeft: {
    flexDirection: 'row',
    width: 150,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  users: {
    borderColor: 'black',
    borderBottomWidth: 0.5,
    padding: 10,
    marginVertical: 5,
  },
  userList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  user: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  handRise: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  allowBtn: {
    width: 100,
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginVertical: 5,
  },
  memberBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  leaveBtn: {
    backgroundColor: '#ef476f',
    paddingVertical: 10,
    width: '45%',
    borderRadius: 10,
  },
  leaveBtnText: {
    color: 'white',
    textAlign: 'center',
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
  },
});
