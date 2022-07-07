import { Image, View } from "react-native"
import { StyleSheet, Text } from "react-native"
import OnBoardingButton from "../../../components/Buttons/OnBoarding"
import AccentPattern from '../../../../assets/accent-pattern.png'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "start",
        backgroundColor: '#FFFFFF',
        paddingLeft: 40,
        paddingRight: 40,
        position: 'relative',
    },
    heading: {
        fontSize: 28,
        fontWeight: "bold",
        color: '#000000',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 20,
        color: '#535353',

    }
})

const WelcomeScreen = () => {
    return (
        <View style={styles.container}>
            <View>
                <Text
                    style={styles.heading}
                >
                    Selamat Datang!
                </Text>
            </View>
            <Text
                style={styles.subtitle}
            >
                Apakah kamu sudah memiliki hafalan Alquran saat ini?
            </Text>
            <View style={{ marginTop: 24, width: '100%' }}>
                <OnBoardingButton title='Sudah' subtitle='Masukkan catatan hafalan saya.' />
                <OnBoardingButton title='Belum' subtitle='Mulai catatan hafalan saya dari awal.' style={{ marginTop: 16}} />
            </View>
            <Image source={AccentPattern} style={{ position: 'absolute', right: 0, bottom: 0}} />
        </View>
    )
}

export default WelcomeScreen;