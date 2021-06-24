import React, {useContext} from 'react';
import CommonRoom from '../components/CommonRoom';
import UserContext from '../Context/Context';

const CreateRoomScreens = ({navigation}) => {
  const {userId} = useContext(UserContext);

  return (
    <CommonRoom
      navigation={navigation}
      id={userId}
      Label1="Your Name"
      Label2="Discussion Topic"
      buttonText="Create Room"
      placeHolderText="Enter Discussion Topic"
    />
  );
};

export default CreateRoomScreens;
