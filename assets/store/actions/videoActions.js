import {useContext} from 'react';
import UserContext, {socket, myPeer} from '../../Context/Context';

import {
  ADD_STREAM,
  ADD_REMOTE_STREAM,
  MY_STREAM,
  JOIN_CHAT,
  COUNTER,
} from './types';

export const joinRoom = (stream) => async (dispatch) => {
  const {room} = useContext(UserContext);
  const roomId = room.room_id;
  dispatch({type: MY_STREAM, paload: stream});

  myPeer.on('open', (userId) => {
    socket.emit('joinRoom', {userId, roomId});
  });

  socket.on('user-connected', (userId) => {
    connectToNewUser(userId, stream, dispatch);
  });

  myPeer.on('call', (call) => {
    call.answer(stream);
    call.on('stream', (stream) => {
      dispatch({type: ADD_STREAM, payload: stream});
    });
  });
};

function connectToNewUser(userId, stream, dispatch) {
  const call = myPeer.call(userId, stream);

  call.on('stream', (remoteStream) => {
    if (remoteStream) {
      dispatch({type: ADD_REMOTE_STREAM, payload: remoteStream});
    }
  });
}

export const counter = () => {
  return {
    type: COUNTER,
  };
};
