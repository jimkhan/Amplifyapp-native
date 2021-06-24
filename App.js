import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './assets/Screens/HomeScreens';
import CreateRoomScreens from './assets/Screens/CreateRoom';
import JoinRoomScreens from './assets/Screens/JoinRoom';
import FilesUploadScreen from './assets/Screens/FilesUploadScreen';
import {UserProvider} from './assets/Context/Context';
import MeetingScreens from './assets/components/MeetingScreens';
import MembersScreens from './assets/components/MemberScreens';
import {Provider} from 'react-redux';
import store from './assets/store';

const Stack = createStackNavigator();

const App = () => {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="JoinRoom"
            component={JoinRoomScreens}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CreateRoom"
            component={CreateRoomScreens}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MeetingScreen"
            component={MeetingScreens}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MembersScreens"
            component={MembersScreens}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="FilesUploadScreen"
            component={FilesUploadScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;
