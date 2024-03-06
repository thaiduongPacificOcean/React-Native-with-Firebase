import { StyleSheet, Text, View , ScrollView} from 'react-native'
import React, {useState, useEffect} from 'react'
import { ListItem, Avatar } from 'react-native-elements'
import { db , auth} from '../../firebaseConfig'
import { Divider } from 'react-native-elements';
import { collection,  doc ,setDoc , getDoc, collectionGroup, onSnapshot, query , orderBy, runTransaction} from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';

const CustomListItem = ({currentUserLogin}) => {
    const navigation = useNavigation();
    console.log(currentUserLogin)
    
    const [users, setUsers] = useState([])

    useEffect(() => { 
        const unsubscribe = onSnapshot(collectionGroup(db, 'users'), (snapshot) => {
          const usersData = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
          setUsers(usersData);
        });
        
        return unsubscribe;
    }, []);

      const handleUserPress = async (user) => {
        const currentUserId = auth.currentUser.uid;
        
        const chatId = currentUserId < user.id ? `${currentUserId}-${user.id}` : `${user.id}-${currentUserId}`;
  
        const chatRef = doc(collection(db, 'chats'), chatId);
        await setDoc(chatRef, {
            users: [currentUserId, user.id]
        });
        navigation.push('Chat', {user , chatId , currentUserLogin});
      }
      
  return (
    <View style={styles.container}>
        <ScrollView>
            {users.map((user, index) => (
                user.id != auth.currentUser.uid && (
                    <View key={index}>
                    <>
                    <Divider width={1} orientation='vertical' />
                    <ListItem onPress={() => handleUserPress(user)} key={index} >
                        <Avatar rounded source={{ uri: user.profile_picture }} />
                        <ListItem.Content>
                            <ListItem.Title>
                                {user.username}
                            </ListItem.Title>   
                            <ListItem.Subtitle>
                                {user.fullname}
                            </ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                    </>

                </View>

                )

            ))}
        </ScrollView>
    </View>
  )
}

export default CustomListItem

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
})