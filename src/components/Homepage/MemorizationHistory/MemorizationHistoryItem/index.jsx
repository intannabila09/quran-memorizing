import { View, TouchableOpacity, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { findJuzFromAyah } from '../../../../utils/helpers';
import ContentMapper from "assets/mushaf/ContentMapper";

const MemorizationHistoryItem = ({
    surah,
    ayah,
    memorizedAt,
    style,
    navigation,
    item
}) => {

    const navigateToSurah = () => {
        const juzNo = findJuzFromAyah(Number(item.surahNumber), 1)
        const surahContent = ContentMapper()[juzNo].metadata
        .find(item => item.name.id === surah)
        const ayahContent = surahContent?.ayah.find(item => item.number === ayah) ?? ''

        // if (!surahContent?.hasOwnProperty('page')) return navigation.navigate('Mushaf')
        return navigation.navigate('Mushaf', {
            pageIndex: ayahContent?.pageIndex ?? 0,
            juzNo: juzNo
        })
    }
    
    return (
        <TouchableOpacity
            style={{
                ...style,
                paddingHorizontal: 16,
                paddingVertical: 12,
                borderRadius: 12,
                backgroundColor: '#FFFFFF',
                borderWidth: 1,
                borderColor: '#E6E6E6',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}
            onPress={navigateToSurah}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                <Ionicons name="checkmark-circle-sharp" size={16} color="#13A355" />
                <View style={{ marginLeft: 8 }}>
                    <Text style={{ fontSize:16, fontWeight:'600' }}>
                        {surah}
                    </Text>
                    <Text style={{ fontSize: 12, marginTop: 4, color: '#777777'}}>
                        {memorizedAt}
                    </Text>
                </View>
            </View>
            <Text style={{ color: '#777777'}}>
                Ayat {ayah}
            </Text>
        </TouchableOpacity>
    )
}

export default MemorizationHistoryItem;