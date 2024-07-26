import { View, Text, Platform } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Image } from 'expo-image';
import { blurhash } from '../ultils/common';
import { useAuth } from '../context/authContext';
import {
    Menu,
    MenuOptions,
    MenuTrigger,
} from 'react-native-popup-menu';
import { MenuItem } from './CustomMenuItems';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
export default function HomeHeader() {
    
    const { user, logout } = useAuth();

    const router = useRouter();

    const handleProfile = () => {
        router.push({ pathname: '/profile', params: user })
    }
    const handleLogOut = async () => {
        await logout();
    }
    return (
        <View className='flex-row justify-between px-5 bg-indigo-400 pb-6 rounded-b-3xl pt-10'>
            <View >
                <Text style={{ fontSize: hp(3) }} className='font-medium text-white'>Chats</Text>
            </View>
            <View>
                <Menu>
                    <MenuTrigger customStyles={{
                        triggerWrapper: {

                        }
                    }}>
                        <Image
                            style={{ height: hp(4.3), aspectRatio: 1, borderRadius: 100 }}
                            source={user?.profileUrl}
                            placeholder={{ blurhash }}
                            contentFit="cover"
                            transition={500}
                        />
                    </MenuTrigger>
                    <MenuOptions
                        customStyles={{
                            optionsContainer: {
                                borderRadius: 10,
                                marginTop: 40,
                                marginLeft: -20,
                                backgroundColor: '#fff',
                                borderCurve: 'continuous',
                                shadowOpacity: 0.2,
                                shadowOffset: { width: 0, height: 0 },
                                width: 160
                            }
                        }}
                    >
                        <MenuItem
                            text='Profile'
                            action={handleProfile}
                            value={null}
                            icon={<Feather name='user' size={hp(2.5)} color='#737373' />}
                        />
                        <MenuItem
                            text='Sign Out'
                            action={handleLogOut}
                            value={null}
                            icon={<Feather name='log-out' size={hp(2.5)} color='#737373' />}
                        />
                    </MenuOptions>
                </Menu>
            </View>
        </View>
    )
}