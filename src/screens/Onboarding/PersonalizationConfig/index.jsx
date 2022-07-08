import { View, Text, StyleSheet, Image } from "react-native"
import AccentPattern from 'assets/accent-pattern.png'
import TextButton from 'components/Buttons/TextButton'
import PrimaryButton from 'components/Buttons/PrimaryButton'

import {
    TikrarDuration,
    TikrarMethod,
    TikrarCount,
    AyahVisibilityMode,
} from 'utils/constants'

import DropDownPicker from "react-native-dropdown-picker"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: '#FFFFFF',
        paddingBottom: 50,
        paddingLeft: 40,
        paddingRight: 40,
        position: 'relative',
    }
})

const PersonalizationConfig = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={{ position: 'relative', width: '100%', elevation: 3, zIndex: 3}}>
                <View style={{ marginBottom: 24 }}>
                    <Text style={{ fontSize: 24, marginBottom: 8, fontWeight: '600'}}>Mode Tutup Ayat</Text>
                    <DropDownPicker
                        items={AyahVisibilityMode}
                    />
                </View>
                <View style={{ marginBottom: 24 }}>
                    <Text style={{ fontSize: 24, marginBottom: 8, fontWeight: '600'}}>Metode Tikrar Ayat</Text>
                    <DropDownPicker
                    
                    />
                </View>
                <View style={{ marginBottom: 68 }}>
                    <DropDownPicker
                    
                    />
                </View>
                <PrimaryButton title="Selesai" />
                <TextButton title="Sebelumnya" style={{ paddingTop: 20 }} onPress={() => navigation.goBack()}/>
            </View>
            <View
                style={{
                    position: 'absolute',
                    elevation: 1,
                    zIndex: 1,
                    right: 0,
                    bottom: 0
                }}
            >
                <Image source={AccentPattern} />
            </View>
        </View>
    )
}

export default PersonalizationConfig;