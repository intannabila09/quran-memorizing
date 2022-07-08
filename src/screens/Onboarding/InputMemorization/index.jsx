import { View, StyleSheet, Text, Image } from "react-native"
import OnBoardingButton from "components/Buttons/OnBoarding"
import AccentPattern from "assets/accent-pattern.png"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "start",
        backgroundColor: '#FFFFFF',
        paddingLeft: 40,
        paddingRight: 40,
        position: 'relative',
        width: '100%',
    },
    subtitle: {
        fontSize: 26,
        color: '#535353',
    }
})

const InputMemorization = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.subtitle}>
                Bagaimana kamu ingin menandai bagian yang sudah kamu hafalkan?
            </Text>
            <View style={{ width: '100%', marginTop: 20, elevation: 3, zIndex: 3 }}>
                <OnBoardingButton
                    title="Berdasarkan Juz"
                    subtitle="Tandai Juz yang sudah saya hafalkan"
                    onPress={() => navigation.navigate('InputByJuz')}
                />
                <OnBoardingButton
                    title="Berdasarkan Surat"
                    subtitle="Tandai surat dan ayat yang sudah saya hafalkan."
                    style={{
                        marginTop: 12,
                    }}
                    onPress={() => navigation.navigate('InputBySurah')}
                />
            </View>
            <Image source={AccentPattern} style={{ position: 'absolute', right: 0, bottom: 0}} />
        </View>
    )
}

export default InputMemorization;