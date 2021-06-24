import React, { useContext, useState} from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import TitleText from '../components/AppTtileText'
import FilesRecord from '../components/FilesRecord'
import fakeData from '../fakeData/fakeUsers'
import UserContext from '../Context/Context';

const FilesUploadScreen = ({route, navigation}) => {

    const { files } = route.params;

    const {
        room,
        SetRoom,
        myStream,
        userStream,
        anotherUserStream,
        socket,
        userId,
        joinedUser,
    } = useContext(UserContext);
    const { room_id, speaker, title, users } = room;

    console.log(joinedUser.name)

    return (
        <View style={styles.conatiner} >
            <TitleText
                title={"Files Uploaded"}
                leftIcon={"folderopen"}
                rightIcon={"close"}
                onPressClose={()=> navigation.goBack()} // use it if you needed
            />
            {
                files &&
                <FlatList
                    data={files}
                    keyExtractor={(itm)=> itm.name.toString()}
                    renderItem={({item, index})=> {
                        return(
                            <FilesRecord
                                fileTitle={item.name}
                                authorname={joinedUser.name}
                                authorType={joinedUser.is_admin === true ? "Host": "Member"}
                            />
                        )
                    }}
                
                />
            }
        </View>
    )
}
const styles = StyleSheet.create({
    conatiner:{
        flex: 1,
    }
})

export default FilesUploadScreen
