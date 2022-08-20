import { useEffect, useState } from 'react';
import { TouchableOpacity, View, Animated  } from 'react-native'
import { FontAwesome5, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useMushafState } from 'context/MushafContext';

import { Audio } from 'expo-av'
import { usePlayerProvider } from 'context/PlayerContext';

const MushafMenuBar = ({
    bottom = 13,
    handleDisplayTranslation = () => {},
    handleDisplayAudioConfig = () => {},
}) => {
    const { dispatch, mushafState } = useMushafState()
    const { visibilityMode } = mushafState

    const { playerState, dispatch: playerDispatch } = usePlayerProvider()
    const { status, playlist, currentIndex, currentIteration, loop, delay } = playerState

    const [playerStatus, setPlayerStatus] = useState('stopped')
    const [audio,setAudio] = useState(null)

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

    const handleViewTranslation = () => {
        handleDisplayTranslation()
    }

    const handlePlayerControl = async () => {
        if (status === 'playing') {
            await playerDispatch({
                type: 'PAUSE_AUDIO',
            })
        } else {
            await playerDispatch({
                type: 'PLAY_AUDIO',
            })
        }
    }

    const _onPlaybackStatusUpdate = async playbackStatus => {
        if (!playbackStatus.isLoaded) {
            // Update your UI for the unloaded state
            if (playbackStatus.error) {
                playerDispatch({
                    type: 'STOP_AUDIO',
                })
                console.log(`Encountered a fatal error during playback: ${playbackStatus.error}`);
            }
        } else {
            if (playbackStatus.isPlaying) {
                console.log(`${playbackStatus.playableDurationMillis}/${playbackStatus.positionMillis}`)
                // Update your UI for the playing state
              } else {
                // Update your UI for the paused state
                // console.log('Implement pause audio')
              }
          
              if (playbackStatus.isBuffering) {
                // Update your UI for the buffering state
                // console.log('buffering')
              }
          
              if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
                setAudio(null)
                if ( // not reached the end of the playlist
                    currentIndex < playlist.length - 1
                ) {
                    // play next ayah
                    setTimeout(() => {
                        playerDispatch({
                            type: 'PLAY_NEXT',
                            payload: {
                                index: currentIndex + 1,
                            }
                        })
                    }, delay)
                } else {
                    // reached the end of the playlist
                    // decrement loop
                    if ((loop - 1) > 0) {
                        playerDispatch({
                            type: 'DECREMENT_LOOP'
                        })
                        // play first ayah
                        setTimeout(() => {
                            playerDispatch({
                                type: 'PLAY_NEXT',
                                payload: {
                                    index: 0,
                                }
                            })
                        }, delay)
                    } else {
                        // stop audio
                        playerDispatch({
                            type: 'STOP_AUDIO',
                        })
                    }
                }
              }
        }
    }

    useEffect(() => {
        const playerControl = async () => {
            // Playing New Ayah
            if (
                status === 'playing' && !audio
            ) {
                setPlayerStatus('playing')
                const { sound } = await Audio.Sound.createAsync(
                    {
                        uri: playlist[currentIndex]
                    }
                )
                sound.setOnPlaybackStatusUpdate( _onPlaybackStatusUpdate )
                await sound.playAsync()
                setAudio(sound)
            }

            // Resuming current ayah
            if (
                status === 'playing' && audio
            ) {
                setPlayerStatus('playing')
                await audio.playAsync()
            }

            // pause
            if (
                status === 'paused'
            ) {
                setPlayerStatus('paused')
                await audio.pauseAsync()
            }

            // stop
            if (status === 'stopped') {
                if (audio) {
                    setPlayerStatus('stopped')
                    await audio.stopAsync()
                    setAudio(null)
                } else {
                    setPlayerStatus('stopped')
                }
            }
            return () => {
                if (audio) {
                    setPlayerStatus('stopped')
                    audio.unloadAsync()
                    setAudio(null)
                }
            }
        }
        playerControl()
    },[status, currentIndex])

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
                            paddingHorizontal: 20,
                            width: 60,
                        }}
                        onPress={handlePlayerControl}
                    >
                        {
                            (status === 'stopped' || status === 'paused') &&
                            <FontAwesome name="play" size={24} color="#A0A0A0" />
                        }
                        {
                            status === 'playing' &&
                            <FontAwesome name="pause" size={24} color="#A0A0A0" />
                        }
                    </TouchableOpacity>
                    {
                        status === 'stopped' && (
                            <TouchableOpacity
                                style={{
                                    marginLeft: 0,
                                    alignItems: 'center',
                                    paddingVertical: 8,
                                    paddingHorizontal: 20,
                                    width: 64,
                                }}
                                onPress={handleDisplayAudioConfig}
                            >
                                <MaterialCommunityIcons name="cog-play" size={24} color="#A0A0A0" />
                            </TouchableOpacity>
                        )
                    }
                    {
                        (status === 'playing' || status === 'paused') && (
                            <TouchableOpacity
                                style={{
                                    marginLeft: 0,
                                    alignItems: 'center',
                                    paddingVertical: 8,
                                    paddingHorizontal: 20,
                                    width: 64,
                                }}
                                onPress={() => {
                                    playerDispatch({
                                        type: 'STOP_AUDIO',
                                    })
                                }}
                            >
                                <FontAwesome name="stop" size={24} color="#A0A0A0" />
                            </TouchableOpacity>
                        )
                    }
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
                    <TouchableOpacity
                        style={{ marginLeft: 0, alignItems: 'center', paddingVertical: 8, paddingHorizontal: 20 }}
                        onPress={handleViewTranslation}
                    >
                        <FontAwesome5 name="globe-asia" size={24} color="#A0A0A0" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ marginLeft: 0, alignItems: 'center', paddingVertical: 8, paddingHorizontal: 20}}
                        onPress={handleToggleViewMode}
                    >
                        <FontAwesome name="eye" size={24} color={visibilityMode === 'all' ? '#A0A0A0' : '#16a34a'} />
                    </TouchableOpacity>
                </View>
            </View>
        </Animated.View>
    )
}

export default MushafMenuBar;