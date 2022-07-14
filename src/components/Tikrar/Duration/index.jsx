import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useMushafState } from 'context/MushafContext';
import { useState, useEffect } from 'react'

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 0,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 12,
        flexGrow: 1,
    }
})

const TikrarDuration = ({ total = 10, durationTarget = 100 }) => {
    const { mushafState, dispatch } = useMushafState()

    const [duration,setDuration] = useState(durationTarget)

    useEffect(() => {
        if (duration > 0) {
            setTimeout(() => {
                setDuration(duration-1)
            },1000)
        }
    },[duration])

    const formatTime = (durationLeft) => {
        let minutes = Math.floor(durationLeft/60)
        let seconds = durationLeft - minutes*60
        return `${minutes}:${seconds === 0 ? '00' : seconds}`
    }

    const resetCounter = () => {
        return dispatch({
            action: 'RESET_COUNT',
        })
    }
    return (
            <View
                style={styles.container}
            >
                <TouchableOpacity
                    style={{
                        backgroundColor: '#FFFFFF',
                        flexGrow: 0,
                        width: 32,
                        height: 32,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 4,
                        borderColor: '#f0f0f0',
                        borderWidth: 1,
                    }}
                    onPress={resetCounter}
                >
                    <MaterialIcons name="loop" size={20} color="#696969" />
                </TouchableOpacity>
                <View
                    style={{
                        height: 8,
                        backgroundColor: '#EAEAEA',
                        borderRadius: 999,
                        borderWidth: 1,
                        borderColor: '#EEEEEE',
                        marginLeft: 8,
                        flexGrow: 7,
                    }}
                >
                    <View
                        style={{ height: '100%', width: `${((durationTarget-duration)/durationTarget)*100}%`, borderRadius: 999}}
                    >
                        <LinearGradient
                            colors={['#26E065', '#13A355']}
                            style={{
                                height: '100%',
                                width: '100%',
                                borderRadius: 999
                            }}
                            end={{
                                x: 1,
                                y: 1,
                            }}
                        />
                    </View>
                </View>
                <Text style={{ marginLeft: 8, flexGrow: 1 }}>{formatTime(duration)}</Text>
            </View>
    )
}

export default TikrarDuration