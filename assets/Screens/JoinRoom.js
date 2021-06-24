import React, {useContext} from 'react';
import CommonRoom from '../components/CommonRoom';
import UserContext from '../Context/Context';

const JoinRoomScreens = ({navigation}) => {
  const {userId} = useContext(UserContext);

  return (
    <CommonRoom
      navigation={navigation}
      id={userId}
      Label1="Your Name"
      Label2="Room Code"
      buttonText="Join Room"
      placeHolderText="Enter Room Code"
    />
  );
};

export default JoinRoomScreens;
