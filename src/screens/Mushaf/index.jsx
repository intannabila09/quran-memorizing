import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { View, SafeAreaView, StyleSheet, Animated, Text } from 'react-native'
import MushafMenuBar from 'components/MushafMenuBar'
import MushafTopMenu from 'components/MushafTopMenu'
import QuranPages from 'components/Mushaf/QuranPages'
import { MushafProvider } from 'context/MushafContext'

import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import CustomBackdrop from 'components/CustomBackdrop'

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f8f5e9',
        width: '100%',
        height: '100%',
        position: 'relative',
        // justifyContent: 'center'
    }
})

const Mushaf = ({ navigation }) => {
    const [showMenu, setShowMenu] = useState(true)
    const bottomMenuPosition = useRef(new Animated.Value(0)).current
    const topMenuPosition = useRef(new Animated.Value(0)).current

    const ayahMenuRef = useRef(null)
    const snapPoints = useMemo(() => ['40%', '50%'],[])
    const [ayahMenuVisible,setAyahMenuVisible] = useState(true)

    const handleSnapChange = (index) => {
        if (index === -1) return setAyahMenuVisible(false)
    }

    const toggleMenu = (menuVisible) => {
        Animated.timing(bottomMenuPosition, {
            toValue: menuVisible ? -100 : 13,
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
        console.log(ayahMenuRef)
    }

    useEffect(() => {
        toggleMenu(showMenu)
    },[showMenu])

    const renderBottomSheetBackdrop = useCallback(
        prop => (
            <BottomSheetBackdrop
                {...prop}
                appearsOnIndex={0}
                disappearsOnIndex={-1}
            />
        )
    )

    return (
        <>
            <View style={{ backgroundColor: showMenu ? '#f8f5e9' : '#FFFFFF', height: 47}} />
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
                            enablePanDownToClose
                            onChange={handleSnapChange}
                        >
                            <View style={{ paddingHorizontal: 20}}>
                                <Text>Awesome 🎉</Text>
                            </View>
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