import {socket} from '../Context/Context';

export const toggleHand = (room_id) => {
  // socket.emit('raiseHand', {room_id});
  // socket.on('updateRoom', (room) => {
  //   // console.log(room);
  //   SetRoom(room);
  // });

  // socket.on('retreatHand', (user) => {
  //   console.log(user);
  // });

  // socket.on('errorRoom', (error) => {
  //   console.log(error);
  // });

  console.log('clickedddddddd', room_id);
};

export const changeSpeaker = (data) => {
  //   socket.emit('changeSpeaker', data,   (user) => {
  //     console.log(user);
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
  console.log('clickedddddddd', data);
};

export const exitRoom = (data) => {
  // socket.emit('exitRoom', data,
  // (user) => {
  //     console.log(user);
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
  console.log('clickedddddddd', data);
};
