import React from 'react'
import { Text, View, StyleSheet, } from 'react-native'


import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue } from "react-native-responsive-fontsize";
import Icon from 'react-native-vector-icons/AntDesign';
import IconClose from 'react-native-vector-icons/EvilIcons';

const AppTtileText = ({ title, textStyle, leftIcon, rightIcon, onPressClose }) => {
    return (

        <View style={styles.main} >

            <View style={styles.leftWraper}>
                {leftIcon && <Icon
                    name={leftIcon}
                    size={RFValue(25)}
                />}
                <Text style={[styles.text, textStyle]} > {title} </Text>

            </View>
            { rightIcon && <IconClose
                name={rightIcon}
                size={RFValue(30)}
                onPress={onPressClose}
            />}

        </View>

    )
}
const styles = StyleSheet.create({
    main: {
        flexDirection: "row",
        alignItems: 'center',
        paddingBottom: hp(2),
        justifyContent: "space-between",
        paddingVertical: hp("3"),
        paddingHorizontal: wp("2"),
        borderBottomColor: "#505050",
        borderBottomWidth: 1,
        marginHorizontal: hp(2),
        // marginBottom: hp(1),


    },
    leftWraper: {
        flexDirection: "row",
        alignItems: 'center',

    },

    text: {
        fontSize: RFValue(20),
        // alignSelf: 'center',

        color: "#505050",
        fontFamily: 'Ubuntu-Bold',
    }
})

export default AppTtileText;
