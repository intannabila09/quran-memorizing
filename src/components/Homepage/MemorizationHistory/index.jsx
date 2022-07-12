import { View, Text } from 'react-native'
import MemorizationHistoryItem from './MemorizationHistoryItem';

const MEMORIZATION_HISTORY_DATA = [
    {
        surah: 'Al-Fatihah',
        ayat: '25',
        memorizedAt: 'Baru Saja'
    },
    {
        surah: 'Al-Baqarah',
        ayat: 25,
        memorizedAt: '8 Jam yang lalu',
    },
    {
        surah: 'Al-Maidah',
        ayat: 51,
        memorizedAt: '1 Hari yang lalu',
    },
    {
        surah: 'Ad-Duha',
        ayat: 11,
        memorizedAt: '3 Hari yang lalu'
    }
]

const MemorizationHistory = () => {
    return (
        <View style={{ marginTop: 24, paddingBottom: 50 }}>
            <Text style={{ fontSize: 18, color: '#333333', fontWeight: '500', marginBottom: 16 }}>
                Riwayat Hafalan Terakhir
            </Text>
            <View>
                {
                    MEMORIZATION_HISTORY_DATA.map((item,idx) => (
                        <MemorizationHistoryItem surah={item.surah} ayah={item.ayat} memorizedAt={item.memorizedAt} key={idx} style={{ marginBottom: 8}} />
                    ))
                }
            </View>
        </View>
    )
}

export default MemorizationHistory;