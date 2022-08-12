import { useState, useEffect, useRef } from 'react'
import { View, SafeAreaView, StyleSheet, Animated } from 'react-native'
import MushafMenuBar from 'components/MushafMenuBar'
import MushafTopMenu from 'components/MushafTopMenu'
import QuranPages from 'components/Mushaf/QuranPages'
import { MushafProvider } from 'context/MushafContext'

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

    useEffect(() => {
        toggleMenu(showMenu)
    },[showMenu])

    return (
        <MushafProvider>
            <View style={{ backgroundColor: showMenu ? '#f8f5e9' : '#FFFFFF', height: 47}} />
                <SafeAreaView>
                    <View style={styles.container}>
                        <MushafTopMenu top={topMenuPosition} navigation={navigation} />
                            <View style={{ flexGrow: 1, backgroundColor: '#f8f5e9' }}>
                                <QuranPages showMenu={showMenu} setShowMenu={setShowMenu} />
                            </View>
                        <MushafMenuBar bottom={bottomMenuPosition} />
                    </View>
                </SafeAreaView>
        </MushafProvider>
    )
}


export default Mushaf;