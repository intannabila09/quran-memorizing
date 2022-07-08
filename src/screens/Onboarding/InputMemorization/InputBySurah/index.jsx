import { useState } from 'react'
import {StyleSheet, View, Image, Text} from 'react-native'
import AccentPattern from 'assets/accent-pattern.png'
import TextButton from 'components/Buttons/TextButton'
import PrimaryButton from 'components/Buttons/PrimaryButton'
import CheckableListInput from 'components/CheckableListInput'
import SurahInputListItem from 'components/SurahInputListItem'
import { SurahItems } from 'utils/constants'
import { useOnBoardingState } from '../../../../context/OnBoardingContext'

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

const InputBySurah = ({ navigation }) => {
    const [activeSurah, setActiveSurah] = useState(null)
    
    const renderSurahItem = (surah) => {
        return (
            <SurahInputListItem
                surah={surah}
                showAyat={activeSurah === surah.item.no}
                setShowAyat={setActiveSurah}
            />
        )
    }
    return (
        <View style={styles.container}>
            <View style={{ position: 'relative', zIndex: 3, elevation: 3, width: '100%'}}>
                <Text style={{ marginBottom: 24, fontSize: 32, fontWeight: 'bold'}}>Pilih surat dan ayat yang sudah kamu hafalkan</Text>
                <CheckableListInput
                    style={{
                        height: 500,
                        marginBottom: 24,
                    }}
                    items={SurahItems}
                    renderItem={renderSurahItem}
                />
                <PrimaryButton title="Selanjutnya"  onPress={() => navigation.navigate('PersonalizationConfig') }/>
                <TextButton title="Sebelumnya" style={{ paddingTop: 20 }} onPress={() => navigation.goBack()}/>
            </View>
            <View style={{ position: 'absolute', bottom: 0, right: 0, zIndex: 1, elevation: 1 }}>
                <Image source={AccentPattern} />
            </View>
        </View>
    )
}

export default InputBySurah;