import { View, Text, FlatList } from 'react-native'
import React from 'react'
import ChatItem from '../components/ChatItem';
import { useRouter } from 'expo-router';

export default function ChatList({ users, currentUser }) {

    const router = useRouter();
    return (
        <View>
            <FlatList
                data={users}
                contentContainerStyle={{ paddingVertical: 25 }}
                keyExtractor={item => Math.random()}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => <ChatItem
                    noBorder={index + 1 == users.length}
                    router={router}
                    item={item}
                    index={index}
                    currentUser={currentUser}
                />}
            />
        </View>
    )
}