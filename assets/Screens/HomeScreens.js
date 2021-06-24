import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue } from "react-native-responsive-fontsize";

import AppText from '../components/AppText'
import colors from '../config/colors'

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.droidSafeArea}>
      <View style={styles.conatiner}>
        <View style={styles.logoArea} >
          <Image
            source={require("../img/AmplifiLogo.png")}
            style={styles.logo}
          />

        </View>
        <View style={styles.buttonArea} >
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('CreateRoom')}>
            <AppText style={styles.textStyle}>Create New Room</AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('JoinRoom')}>
            <AppText style={styles.textStyle}>Join Existing Room</AppText>
          </TouchableOpacity>

        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    backgroundColor: colors.backBody,
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  conatiner: {
    flex: 1,
    
  },
  logo:{
    width: hp(27),
    height: hp(13)
  },
  
  logoArea:{
    position: "absolute",
    alignSelf: 'center',
    top: hp(20),

  },
  buttonArea:{
    position: 'absolute',
    alignSelf: 'center',
    bottom: hp(15),
    // right: wp(5)
  },
  textStyle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: RFValue(15),
  },
  button: {
    backgroundColor: '#7E52A2',
    marginVertical: hp(1.6),
    // marginHorizontal: 30,
    padding: hp(2.7),
    borderRadius: hp(1),
    width: wp(75),
  },
});
