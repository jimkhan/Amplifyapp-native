import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue } from "react-native-responsive-fontsize";
import Icon from 'react-native-vector-icons/Ionicons'
import AppText from './AppText'

const FilesRecord = ({ fileTitle, authorname, authorType}) => {
    return (
        <View style={styles.container} >
            <View style={styles.textContainer} >
                <AppText style={styles.fileTile} >{fileTitle}</AppText>
                {authorname && 
                    <AppText style={styles.authorNmae} >{authorname}{authorType
                    && <AppText style={styles.authorType}> {` (${authorType})`}</AppText> }
                </AppText>}

            </View>
            <Icon
                name={"arrow-down-circle-outline"}
                size={RFValue(35)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: hp(1.3),
        borderBottomColor: "#505050",
        borderBottomWidth: 1,
        paddingRight: wp(1),
        marginHorizontal: hp(2),
    },
    authorType:{
        fontSize: RFValue(10),
        fontFamily: 'Ubuntu-Regular'
    },
    fileTile:{
        marginVertical: hp(0.2),
        fontSize: RFValue(15),
    },
    authorNmae:{
        fontFamily: 'Ubuntu-Regular'
    },
})

export default FilesRecord
