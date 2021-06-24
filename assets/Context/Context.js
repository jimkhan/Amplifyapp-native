// import React, { useEffect, useState } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { v4 as uuidv4 } from 'uuid';
// import io from 'socket.io-client';
// import Peer from 'react-native-peerjs';

// export const socket = io('https://webrtc.princebillygk.tech');

// const localPeer = new Peer();
// localPeer.on('error', console.log);

// localPeer.on('open', (localPeerId) => {
//   console.log('Local peer open with ID', localPeerId);
// });

// const UserContext = React.createContext();

// export const UserProvider = ({ children }) => {
//   const id = uuidv4();

//   (async () => {
//     try {
//       await AsyncStorage.setItem('userId', id);
//     } catch (e) {
//       // saving error
//     }
//   })();

//   const [room, SetRoom] = useState({});
//   //   useEffect(() => {}, []);
//   return (
//     <UserContext.Provider value={{ room, id, SetRoom, socket }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export default UserContext;



import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Peer from 'react-native-peerjs';
import { mediaDevices } from 'react-native-webrtc';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';

// export const socket = io('https://amp-testing-backend.herokuapp.com/');

// console.log(socket)
// http://142.93.240.232/
// 142.93.240.232
// export const socket = io('http://142.93.240.232/');

export const socket = io('http://webrtc.princebillygk.tech');

export const myPeer = new Peer({

    host: 'http://webrtc.princebillygk.tech',
    secure: false,
    port: '80',
    path: '/peerjs',
    // config: {
    //     'iceServers': [
    //         { url: 'stun:stun.l.google.com:19302' },
    //         { url: 'turn:homeo@turn.bistri.com:80', credential: 'homeo' }
    //       ]
    //     }
      });
      
// export const socket = io('http://142.93.240.232/');
// export const myPeer = new Peer( { 
//   host: '142.93.240.232',
//   secure: false, 
//   port: '80',
//   config: { 
//     iceServers: [
//       { urls: ['stun:stun1.l.google.com:19302',
//                 'stun:stun2.l.google.com:19302',
//               ],
//        },
//       ],
//     },
// });

myPeer.on('error', console.log);

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [joinedUser, SetJoinedUser] = useState(null);
  const [bannedUser, SetBannedUser] = useState(null);
  const [room, SetRoom] = useState(null);
  const [myStream, SetMyStream] = useState(null);
  const [peerId, SetPeerId] = useState(null);
  const [userId, SetUserId] = useState(null);
  const [userStream, SetUsertStream] = useState(null);
  const [anotherUserStream, SetAnotherUserStream] = useState(null);
  // console.log(myStream);
  const id = uuidv4();

  //
  myPeer.on('open', (peerId) => {
    SetPeerId(peerId);
  });

  // console.log(peerId);

  const peers = {};
  // console.log('peersssssssss', peers);
  socket.on('userDisconnected', (user) => {
    console.log('disconnect users peerid', user);
  });

  useEffect(() => {
    // socket.on('userBanned', (user) => {
    //   SetBannedUser(user.peer_id);
    //   console.log('bannedUser', user);
    //   socket.close();
    // });
    // bannedUser && socket.disconnect();
    socket.on('BannedUser', (user) => {
      console.log('user banned', user);
      socket.close();
    });
  }, []);
  if (peers[bannedUser]) peers[bannedUser].close();

  useEffect(() => {
    socket.on('updateRoom', (room) => {
      SetRoom(room);
      // console.log(room);
    });
    socket.on('userBanned', (user) => {
      // console.log(user);
    });
  }, []);

  const usersFromRoom = room && Object.keys(room.users);
  const speakerUser =
    usersFromRoom && usersFromRoom.find((item) => item === room.speaker);

  const isSpeaker = joinedUser && speakerUser === joinedUser.socket_id;
  const [audio, setAudio] = useState(false);
  useEffect(() => {
    isSpeaker && setAudio(true);
  }, [isSpeaker]);
  const connectToNewUser = (peerId, stream) => {
    const call = myPeer.call(peerId, stream);
    call.on('stream', (userVideoStream) => {
      if (userVideoStream) {
        SetAnotherUserStream(userVideoStream);
        // console.log('balchal', userVideoStream);
      }
    });
    call.on('close', () => {
      SetAnotherUserStream(null);
      SetUsertStream(null);
      SetMyStream(null);
    });
    console.log('sdfsf', peerId);
    peers[peerId] = call;
  };
  useEffect(() => {
    mediaDevices
      .getUserMedia({
        audio: true,
        video: false,
      })
      .then((stream) => {
        SetMyStream(stream);
        // console.log(stream);

        myPeer.on('call', (call) => {
          call.answer(stream);

          call.on('stream', (stream) => {
            if (stream) {
              SetUsertStream(stream);
              // console.log('balchalkkkkkkkkkkkk', stream);
            }
          });
        });
        socket.on('userJoined', (user) => {
          // console.log(user);
          connectToNewUser(user.peer_id, stream);
        });
      })
      .catch((error) => {
        // Log error
      });
  }, [isSpeaker]);

  !userId &&
    (async () => {
      try {
        await AsyncStorage.setItem('userId', id);
        // await AsyncStorage.setItem('peerId', peerId);
      } catch (e) {
        // saving error
      }
    })();

  !userId &&
    (async () => {
      try {
        const value = await AsyncStorage.getItem('userId');
        if (value !== null) {
          // value previously stored
          SetUserId(value);
        } else {
          SetUserId(id);
        }
      } catch (e) {
        // error reading value
      }
    })();

  // console.log(userId);

  return (
    <UserContext.Provider
      value={{
        room,
        SetRoom,
        socket,
        peerId,
        myStream,
        SetMyStream,
        userStream,
        SetUsertStream,
        anotherUserStream,
        SetAnotherUserStream,
        joinedUser,
        SetJoinedUser,
        userId,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
