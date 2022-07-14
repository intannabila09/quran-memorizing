import { useState, useEffect, useRef } from 'react'
import { Text, View, SafeAreaView, StatusBar, TouchableOpacity, StyleSheet, ImageBackground, Pressable, Animated } from 'react-native'
import MushafMenuBar from 'components/MushafMenuBar'
import MushafTopMenu from 'components/MushafTopMenu'
import QuranPages from 'components/Mushaf/QuranPages'
import { MushafProvider } from '../../context/MushafContext'

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        height: '100%',
        position: 'relative',
        // justifyContent: 'center'
    }
})

const Mushaf = ({ navigation }) => {
    const [showMenu, setShowMenu] = useState(false)
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
            <View style={{ backgroundColor: '#FFFFFF', height: 47}} />
                <SafeAreaView>
                    <View style={styles.container}>
                        <MushafTopMenu top={topMenuPosition} navigation={navigation} />
                            <View style={{ flexGrow: 1, backgroundColor: '#FFFFFF' }}>
                                <QuranPages showMenu={showMenu} setShowMenu={setShowMenu} />
                            </View>
                        <MushafMenuBar bottom={bottomMenuPosition} />
                    </View>
                </SafeAreaView>
        </MushafProvider>
    )
}


export default Mushaf;