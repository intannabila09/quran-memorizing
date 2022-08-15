import { useState, useEffect, useRef, useMemo, useCallback, forwardRef } from 'react'
import { View, SafeAreaView, StyleSheet, Animated, Platform } from 'react-native'
import MushafMenuBar from 'components/MushafMenuBar'
import MushafTopMenu from 'components/MushafTopMenu'
import QuranPages from 'components/Mushaf/QuranPages'
import { MushafProvider } from 'context/MushafContext'

import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import AyahMenuContent from 'components/BottomSheet/AyahMenuContent'
import { useMushafState } from 'context/MushafContext'
import { useUserData } from 'context/UserDataContext'

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f8f5e9',
        width: '100%',
        height: '100%',
        position: 'relative',
        // justifyContent: 'center'
    }
})

const { OS } = Platform

const ForwardAyahMenuContent = forwardRef((props, ref) => <AyahMenuContent {...props} forwardedRef={ref} />)

const Mushaf = ({ navigation }) => {
    const [showMenu, setShowMenu] = useState(true)
    const bottomMenuPosition = useRef(new Animated.Value(0)).current
    const topMenuPosition = useRef(new Animated.Value(0)).current

    const ayahMenuRef = useRef(null)
    const snapPoints = useMemo(() => ['40%', '50%'],[])
    const [ayahMenuVisible,setAyahMenuVisible] = useState(false)

    const { mushafState, dispatch } = useMushafState()
    const { selectedAyah } = mushafState
    const { userDataState } = useUserData()
    const { memorized } = userDataState

    console.log(userDataState.memorizationHistory.length)
    console.log(userDataState.memorizationHistory)

    const handleSnapChange = (index) => {
        if (index === -1) return setAyahMenuVisible(false)
    }

    const toggleMenu = (menuVisible) => {
        Animated.timing(bottomMenuPosition, {
            toValue: menuVisible ? -100 : OS === 'ios' ? 15 : 32,
            duration: 200,
            useNativeDriver: false,
        }).start()
        Animated.timing(topMenuPosition, {
            toValue: menuVisible ? -100 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start()
    }

    const handleDisplayAyahMenu = (ayah) => {
        setAyahMenuVisible(true)
        dispatch({
            action: 'SET_SELECTED_AYAH',
            payload: ayah
        })
    }

    useEffect(() => {
        toggleMenu(!showMenu)
    },[showMenu])

    const renderBottomSheetBackdrop = useCallback(
        prop => (
            <BottomSheetBackdrop
                {...prop}
                appearsOnIndex={0}
                disappearsOnIndex={-1}
                pressBehavior="close"
            />
        )
    )

    return (
        <>
            <View style={{ backgroundColor: !showMenu ? '#f8f5e9' : '#FFFFFF', height: 47}} />
            <SafeAreaView>
                <View style={styles.container}>
                    <MushafTopMenu top={topMenuPosition} navigation={navigation} />
                        <View style={{ flexGrow: 1, backgroundColor: '#f8f5e9' }}>
                            <QuranPages
                                showMenu={showMenu}
                                setShowMenu={setShowMenu}
                                handleDisplayAyahMenu={handleDisplayAyahMenu}
                            />
                        </View>
                    <MushafMenuBar bottom={bottomMenuPosition} />
                </View>
                {
                    ayahMenuVisible && (
                        <BottomSheet
                            ref={ayahMenuRef}
                            index={1}
                            snapPoints={snapPoints}
                            backdropComponent={renderBottomSheetBackdrop}
                            {...(OS === 'android' && { handleComponent: null})}
                            enablePanDownToClose
                            onChange={handleSnapChange}
                        >
                            <ForwardAyahMenuContent
                                memorized={(() => {
                                    if (selectedAyah) {
                                        const [surahIndex,ayahNumber] = selectedAyah.split(':')
                                        if (memorized.surah[surahIndex]) return memorized.surah[surahIndex].includes(ayahNumber)
                                        else return false
                                    }
                                    return false
                                })()}
                                ref={ayahMenuRef}
                            />
                        </BottomSheet>
                    )
                }
            </SafeAreaView>
        </>
    )
}

const MushafPage = ({ navigation }) => {
    return (
        <MushafProvider>
            <Mushaf navigation={navigation} />
        </MushafProvider>
    )
}


export default MushafPage;