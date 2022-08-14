import { TouchableOpacity, View, Animated  } from 'react-native'
import { FontAwesome5, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import tikrarPlus from 'assets/tikrarPlus.png'
import { useMushafState } from 'context/MushafContext';
import { useOnBoardingState } from 'context/OnBoardingContext';

import { Audio } from 'expo-av'

const MushafMenuBar = ({ bottom = 13 }) => {
    const { dispatch, mushafState } = useMushafState()

    const increaseCounter = () => {
        dispatch({
            action: 'ADD_COUNT',
        })
    }

    const toggleTimerState = () => {
        dispatch({
            action: 'TOGGLE_TIMER_STATE',
        })
    }

    const handleToggleViewMode = () => {
        dispatch({
            action: 'TOGGLE_VIEW_MODE',
        })
    }

    const quickPlay = async () => {
        try {
            // SoundPlayer.playUrl('https://cdn.islamic.network/quran/audio/128/ar.alafasy/262.mp3')
            const {sound} = await Audio.Sound.createAsync(
                {uri: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/262.mp3'},
                {shouldPlay: true}
            )
            console.log('playing')
            await sound.replayAsync()
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Animated.View
            style={{
                width: '100%',
                height: 85,
                backgroundColor: '#FFFFFF',
                position: 'absolute',
                bottom: bottom,
                paddingHorizontal: 20,
                borderTopWidth: 1,
                borderTopColor: '#E0E0E0',
                paddingTop: 4,
            }}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <View  style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexGrow: 1}}>
                    <TouchableOpacity
                        style={{
                            marginLeft: 0,
                            alignItems: 'center',
                            paddingVertical: 8,
                            paddingHorizontal: 20
                        }}
                        onPress={quickPlay}
                    >
                        <FontAwesome name="play" size={24} color="#A0A0A0" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginLeft: 0, alignItems: 'center', paddingVertical: 8, paddingHorizontal: 20}}>
                        <MaterialCommunityIcons name="cog-play" size={24} color="#A0A0A0" />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={{
                        backgroundColor: '#1DC25D',
                        width: 58,
                        height: 58,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 999,
                        marginHorizontal: 16
                    }}
                    onPress={mushafState.tikrarMethod === 'count' ? increaseCounter : toggleTimerState}
                >
                    {mushafState.tikrarMethod === 'count' ? (
                        <FontAwesome5 name="angle-double-up" size={32} color="#FFFFFF" style={{ marginBottom: 0 }} />
                    ): mushafState.timerState === 'iddle' ? (
                        <FontAwesome5 name="stopwatch" size={32} color="#FFFFFF" />
                    ): (
                        <FontAwesome name="pause" size={32} color="#FFFFFF" />
                    )}
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexGrow: 1}}>
                    <TouchableOpacity style={{ marginLeft: 0, alignItems: 'center', paddingVertical: 8, paddingHorizontal: 20 }}>
                        <FontAwesome5 name="globe-asia" size={24} color="#A0A0A0" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ marginLeft: 0, alignItems: 'center', paddingVertical: 8, paddingHorizontal: 20}}
                        onPress={handleToggleViewMode}
                    >
                        <FontAwesome name="eye" size={24} color="#A0A0A0" />
                    </TouchableOpacity>
                </View>
            </View>
        </Animated.View>
    )
}

export default MushafMenuBar;