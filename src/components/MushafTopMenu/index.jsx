import { Text, Animated, TouchableOpacity } from "react-native"
import { useState } from 'react'
import { AntDesign } from '@expo/vector-icons';

import TikrarCount from "../Tikrar/Count";

const MushafTopMenu = ({ top = 0, navigation }) => {
    const [tikrarMethod, setTikrarMethod] = useState('count')
    
    return (
        <Animated.View
            style={{
                width: '100%',
                height: 50,
                backgroundColor: '#FFFFFF',
                position: 'absolute',
                top: top,
                paddingHorizontal: 20,
                borderBottomWidth: 1,
                borderBottomColor: '#E0E0E0',
                zIndex: 3,
                flexDirection: 'row',
                alignItems: 'center'
            }}
        >
            <TouchableOpacity
                style={{
                    paddingRight: 12,
                    borderRightWidth: 1,
                    borderRightColor: '#E6E6E6'
                }}
                onPress={() => navigation.goBack()}
            >
                <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
            {
                tikrarMethod === 'count' && (
                    <TikrarCount />
                )
            }
        </Animated.View>
    )
}

export default MushafTopMenu;