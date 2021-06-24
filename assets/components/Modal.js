import React, {useContext, useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import UserContext from '../Context/Context';

const ModalComponent = ({room_id, socket_id}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const {room, joinedUser, socket, SetRoom} = useContext(UserContext);
  // const roomId = room.room_id && room.room_id;
  // const socketId = joinedUser.socket_id;

  // console.log('data', room_id, socket_id);
  // console.log(room);

  // modal functions

  const banUser = (data) => {
    // console.log(data);
    socket.emit('banUser', data);
    socket.on('updateRoom', (room) => {
      // console.log('after user banned', room);
      SetRoom(room);
      socket.emit('disconnect');
    });
  };

  const addAdmin = (data) => {
    console.log(data);
    socket.emit('addAdmin', data);

    // socket.on('updateRoom', (room) => {
    //   console.log(room);
    // });
    // socket.on('adminChange', (user) => {
    //   console.log(user);
    // });

    // socket.on('errorRoom', (error) => {
    //   // SetRoom(room);
    //   console.log(error);
    // });
  };

  const removeAdmin = (data) => {
    socket.emit('removeAdmin', data);
    //   socket.emit('removeAdmin', data,
    //   (user) => {
    //     console.log(user);
    //     if (user) {
    //       socket.on('updateRoom', (room) => {
    //         console.log(room);
    //       });
    //       socket.on('adminChange', (user) => {
    //         console.log(user);
    //       });
    //     } else {
    //       socket.on('errorRoom', (error) => {
    //         // SetRoom(room);
    //         console.log(error);
    //       });
    //     }
    //   });
    console.log('clickedddddddd', data);
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={{...styles.openButton}}
              onPress={() =>
                banUser({
                  room_id: room_id,
                  socket_id_to_ban: socket_id,
                })
              }>
              <Text style={styles.textStyle}>Ban User</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{...styles.openButton}}
              onPress={() =>
                addAdmin({
                  room_id: room_id,
                  socket_id_to_add_admin: socket_id,
                })
              }>
              <Text style={styles.normalTextStyle}>Add Admin</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{...styles.openButton}}
              onPress={() =>
                removeAdmin({
                  room_id: room_id,
                  socket_id_to_remove_admin: socket_id,
                })
              }>
              <Text style={styles.textStyle}>Remove Admin</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{...styles.closeButton}}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text>Close</Text>
              <EvilIcons name="close" size={26} color="red" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
        }}>
        <Entypo name="dots-three-horizontal" size={24} color="black" />
      </TouchableOpacity>
    </>
  );
};

export default ModalComponent;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    borderRadius: 10,
    padding: 10,
    width: 120,
    borderColor: 'black',
    borderWidth: 1,
    marginVertical: 10,
  },
  textStyle: {
    color: 'red',
    textAlign: 'center',
  },
  normalTextStyle: {
    color: 'green',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  closeButton: {
    borderRadius: 10,
    padding: 10,
    width: 120,
    borderColor: 'black',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
