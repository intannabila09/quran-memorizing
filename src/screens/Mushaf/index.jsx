import { Text, View, SafeAreaView, StatusBar, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native'
import Test from 'assets/test.png'
import MushafMenuBar from 'components/MushafMenuBar'
import MushafTopMenu from 'components/MushafTopMenu'

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        height: '100%',
        position: 'relative',
        // justifyContent: 'center'
    }
})

const Mushaf = () => {
    return (
        <>
        <View style={{ backgroundColor: '#FFFFF', height: 47}} />
            <SafeAreaView>
                <View style={styles.container}>
                <MushafTopMenu />
                    <View style={{ width: '100%', height: '82%', backgroundColor: '#FFFFFF' }}>
                        <ImageBackground source={Test} style={{ width: '100%', height: '100%'}} resizeMode="contain"  />
                    </View>
                    <MushafMenuBar />
                </View>
            </SafeAreaView>
        </>
    )
}


export default Mushaf;